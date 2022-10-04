import { Browser, launch, Page } from 'puppeteer-core'
import { TimeoutError } from 'rxjs'
import { env } from '../config/environment.config'
import { FlowControl } from './enums/flow-control.enum'
import { Speed } from './enums/speed.enum'
import { State } from './enums/state.enum'
import { DeviceInformation } from './types/device-information.type'
import { Frames } from './types/frame.type'
import { PortStatus } from './types/port-status.type'
import { Ports } from './types/port.type'
import { Tab } from './types/tab.type'

export class Crawler {
  browser?: Browser
  page?: Page

  private constructor() {}

  static async init() {
    console.log(`[INFO]: Initializing scrapper`)
    const scrapper = new Crawler()
    scrapper.browser = await scrapper.launchBrowser()
    scrapper.page = await scrapper.browser.newPage()
    return scrapper
  }

  private async launchBrowser() {
    console.log(`[INFO]: launching browser`)

    try {
      return await launch({
        headless: false,
        // args: [
        //   '--disable-dev-shm-usage',
        //   '--disable-web-security',
        //   '--allow-running-insecure-content',
        //   '--no-sandbox',
        //   '--disable-gpu',
        // ],
        product: 'chrome',
        executablePath: env.browser.ExecutablePath,
      })
    } catch (error: any) {
      throw new Error(`[ERROR!]: ${error.message}`)
    }
  }

  async loginToSwitch(baseUrl: string, username: string, password: string) {
    console.log(`[INFO]: logging in switch`)

    if (!this.page)
      throw new Error(
        '[ERROR!]: you are trying to use scrapper without initializing it',
      )

    try {
      await this.page.goto(baseUrl)
    } catch (error: any) {
      if (error instanceof TimeoutError)
        throw new Error(
          `[ERROR!]: Timeout at page navigation to switch web interface`,
        )
      else throw new Error(`[ERROR!]: Unexpected error ${error.message}`)
    }

    try {
      const nameInput = await this.page.waitForSelector('input[id=username]', {
        timeout: 5000,
      })
      const passwordInput = await this.page.waitForSelector(
        'input[id=password]',
        { timeout: 5000 },
      )
      const loginButton = await this.page.waitForSelector('input[id=logon]', {
        timeout: 5000,
      })

      await nameInput!.type(username)
      await passwordInput!.type(password)
      await loginButton!.click()
    } catch (error: any) {
      if (error instanceof TimeoutError)
        console.info(
          `[INFO]: Timeout at retriving inputs for login, problably already logged. Skipping...`,
        )
      else throw new Error(`[ERROR!]: Unexpected error ${error.message}`)
    }
    try {
      await this.page.waitForNetworkIdle({ idleTime: 5000 })
    } catch (error: any) {
      if (error instanceof TimeoutError)
        throw new Error(`[ERROR!]: Timeout waiting for network idle`)
      else throw new Error(`[ERROR!]: Unexpected error ${error.message}`)
    }
  }

  async getSystemInformation() {
    console.info(`[INFO]: geting system information`)

    if (!this.page)
      throw new Error(
        '[ERROR!]: you are trying to use scrapper without initializing it',
      )

    try {
      await this.goToTab('System Info')

      const mainFrame = this.getFrame('mainFrame')

      const spans = await mainFrame.$$('span')
      const spanValues = await Promise.all(
        spans.map(async (it) => {
          const property = await it.getProperty('innerText')
          const value = await property.jsonValue()
          return value
        }),
      )
      if (spanValues.length < 15)
        throw new Error(`[ERROR!]: information size is wrong`)

      const information: DeviceInformation = {
        deviceDescription: spanValues[3],
        MacAddress: spanValues[5],
        IpAddress: spanValues[7],
        SubneMask: spanValues[9],
        DefaultGateway: spanValues[11],
        FirmwareVersion: spanValues[13],
        HardwareVersion: spanValues[15],
      }
      return information
    } catch (error: any) {
      throw error
    }
  }

  async goToTab(tabName: Tab) {
    if (!this.page)
      throw new Error(
        '[ERROR!]: you are trying to use scrapper without initializing it',
      )
    console.info(`[INFO]: going to tab ${tabName}`)
    try {
      const bottomLeftFrame = this.getFrame('bottomLeftFrame')
      const hyperLinks = await bottomLeftFrame.$$('a')
      const linkObjectArray = await Promise.all(
        hyperLinks.map(async (it) => {
          const property = await it.getProperty('innerText')
          const value = await property.jsonValue()
          return { handler: it, value: value }
        }),
      )
      const linkObject = linkObjectArray.find((it) => it.value === tabName)
      if (!linkObject) throw new Error(`[ERROR!]: could not retrieve tab link`)
      await linkObject.handler.evaluate((h) => {
        h.click()
      })
      await this.page.waitForNetworkIdle({ idleTime: 5000 })
    } catch (error: any) {
      throw error
    }
  }

  async changePortStatus(
    port: Ports,
    status: State,
    speed: Speed,
    flowControl: FlowControl,
  ) {
    console.info(`[INFO]: changing port ${port} settings`)
    try {
      await this.goToTab('Port Setting')

      const mainFrame = this.getFrame('mainFrame')

      await mainFrame.select('select[id=portSel]', port)
      await mainFrame.select('select[name=state]', status)
      await mainFrame.select('select[name=speed]', speed)
      await mainFrame.select('select[name=flowcontrol]', flowControl)
      await mainFrame.click('input[name=apply]')
      await this.waitMs(1000)
    } catch (error) {
      throw error
    }
  }

  async getPortStatus() {
    if (!this.page)
      throw new Error(
        '[ERROR!]: you are trying to use scrapper without initializing it',
      )
    try {
      await this.goToTab('Port Setting')

      const mainFrame = this.getFrame('mainFrame')
      await this.page.pdf({ path: './port-status.pdf', landscape: true })

      const portsTable = await mainFrame.$$('td[class=TABLE_HEAD_BOTTOM]')
      const properties = await Promise.all(
        portsTable.map(async (it) => await it.getProperty('innerText')),
      )
      const values = await Promise.all(
        properties.map(async (it) => await it.jsonValue()),
      )
      await this.writeMainFrameToFile()
      const portsStatuses: PortStatus[] = []
      for (let i = 0; i < 8 * 6; i += 6) {
        portsStatuses.push({
          port: values[i],
          status: values[i + 1],
          speedDuplex: {
            configuration: values[i + 2],
            actual: values[i + 3],
          },
          flowControl: {
            configuration: values[i + 4],
            actual: values[i + 5],
          },
        } as PortStatus)
      }
      return portsStatuses
    } catch (error) {}
  }

  getFrame(frameName: Frames) {
    if (!this.page)
      throw new Error(
        '[ERROR!]: you are trying to use scrapper without initializing it',
      )

    console.info(`[INFO]: getting ${frameName} frame`)

    const frames = this.page.frames()
    const frame = frames.find((it) => it.name() === frameName)
    if (!frame)
      throw new Error(`[ERROR!]: could not retrieve ${frameName} frame`)
    return frame
  }

  async writeMainFrameToFile() {
    console.info(`[INFO]: writing main frame content`)

    if (!this.page)
      throw new Error(
        '[ERROR!]: you are trying to use scrapper without initializing it',
      )
    try {
      const mainFrame = this.getFrame('mainFrame')
      if (!mainFrame) throw new Error(`[ERROR!]: could not retrieve main frame`)
    } catch (error) {
      throw error
    }
  }

  async waitMs(ms: number) {
    console.info(`[INFO]: wainting for ${ms} ms`)

    return await new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }
}
