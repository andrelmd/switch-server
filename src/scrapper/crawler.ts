import { Browser, launch, Page } from 'puppeteer-core'
import { TimeoutError } from 'rxjs'
import { env } from '../config/environment.config'
import { Port } from '../port/entities/port.entity'
import { DeviceInformation } from './types/device-information.type'
import { Frames } from './types/frame.type'
import { PortStatus } from './types/port-status.type'
import { Tab } from './types/tab.type'

export class Crawler {
  browser?: Browser
  page?: Page

  private constructor() {}

  static async init() {
    console.log(`[INFO]: Initializing scrapper`)
    const scrapper = new Crawler()
    try {
      scrapper.browser = await scrapper.launchBrowser()
      scrapper.page = await scrapper.browser.newPage()
    } catch (error) {
      console.error('Could not initiate crawler')
      throw error
    }
    return scrapper
  }

  private async launchBrowser(): Promise<Browser> {
    console.log(`[INFO]: launching browser`)

    try {
      return await launch({
        headless: true,
        args: [
          '--disable-dev-shm-usage',
          '--disable-web-security',
          '--allow-running-insecure-content',
          '--no-sandbox',
          //   '--disable-gpu',
        ],
        product: 'chrome',
        executablePath: env.browser.ExecutablePath,
      })
    } catch (error) {
      console.error('Could not initiate browser')
      throw error
    }
  }

  async closeBrowser() {
    try {
      console.info('[INFO]: closing browser')
      await this.browser.close()
      console.info('[INFO]: browser closed')
    } catch (error) {
      console.error(`Could not close browser`)
      throw error
    }
  }

  private pageIsNotNull() {
    if (!this.page)
      throw new Error('You are trying to use scrapper without initializing it')
  }

  async loginToSwitch(baseUrl: string, username: string, password: string) {
    console.log(`[INFO]: logging in switch`)

    this.pageIsNotNull()

    try {
      await this.page.goto(baseUrl)
    } catch (error: any) {
      if (error instanceof TimeoutError)
        throw new Error(`Timeout at page navigation to switch web interface`)
      else throw error
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

      await nameInput.type(username)
      await passwordInput.type(password)
      await loginButton.click()
    } catch (error: any) {
      if (error instanceof TimeoutError)
        console.info(
          `[INFO]: Timeout at retriving inputs for login, problably already logged. Skipping...`,
        )
      else error
    }
    try {
      await this.page.waitForNetworkIdle({ idleTime: 5000 })
    } catch (error: any) {
      if (error instanceof TimeoutError)
        throw new Error(`Timeout waiting for network idle`)
      else throw error
    }
  }

  async getSystemInformation() {
    console.info(`[INFO]: geting system information`)

    this.pageIsNotNull()

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
      if (spanValues.length < 15) throw new Error(`Information size is wrong`)

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
    console.info(`[INFO]: going to tab ${tabName}`)

    this.pageIsNotNull()

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
      if (!linkObject) throw new Error(`Could not retrieve tab link`)
      await linkObject.handler.evaluate((h) => {
        h.click()
      })
      await this.page.waitForNetworkIdle({ idleTime: 5000 })
    } catch (error: any) {
      throw error
    }
  }

  async changePortStatus(port: Port) {
    console.info(
      `[INFO]: changing port ${port.number} settings of device id ${port.deviceId}`,
    )
    try {
      await this.goToTab('Port Setting')

      const mainFrame = this.getFrame('mainFrame')

      await mainFrame.select('select[id=portSel]', String(port.number))
      await mainFrame.select('select[name=state]', String(port.statusId - 1))
      await mainFrame.select('select[name=speed]', String(port.speedId))
      await mainFrame.select(
        'select[name=flowcontrol]',
        String(port.flowControlId - 1),
      )
      await mainFrame.click('input[name=apply]')
      await this.waitMs(1000)
    } catch (error) {
      throw error
    }
  }

  async getPortStatus() {
    try {
      await this.goToTab('Port Setting')

      const mainFrame = this.getFrame('mainFrame')

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
    } catch (error) {
      throw error
    }
  }

  getFrame(frameName: Frames) {
    console.info(`[INFO]: getting ${frameName} frame`)

    this.pageIsNotNull()

    const frames = this.page.frames()
    const frame = frames.find((it) => it.name() === frameName)
    if (!frame) throw new Error(`Could not retrieve ${frameName} frame`)
    return frame
  }

  async writeMainFrameToFile() {
    console.info(`[INFO]: writing main frame content`)

    this.pageIsNotNull()

    try {
      const mainFrame = this.getFrame('mainFrame')
      if (!mainFrame) throw new Error(`Could not retrieve main frame`)
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
