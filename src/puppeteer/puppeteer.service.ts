import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';

@Injectable()
export class PuppeteerService {
    async find(elapsedTime: Date = new Date()) {
        const browser = await puppeteer.launch({ headless: false, args: ['--disable-features=site-per-process'] })
        try {
            const page = await browser.newPage()
            await page.goto('http://192.168.1.1/login.html');
            let frame = page.frames().find((it => it.name() === 'loginPage'))
            const userInput = await frame.waitForSelector('input[id=User]')
            await userInput.type('user')
            const passwordInput = await frame.waitForSelector('input[id=Passwd]')
            await passwordInput.type('user1234')
            const loginButton = await frame.waitForSelector('input[id=submit]')
            loginButton.click()
            await Promise.all([
                page.waitForNavigation({ timeout: 1000 }).catch(async () => { await browser.close(); console.log(`${(new Date().getTime() - elapsedTime.getTime()) / 1000}`); return await this.find(elapsedTime) })
            ])

            frame = page.frames().find((it => it.name() === 'loginPage'))
            const r = await page.content()
            const logoutButton = await frame.waitForSelector('span[id=headerLogoutSpan]')
            logoutButton.click()
            await Promise.all([
                page.waitForNavigation()
            ])
            // await page.pdf({ path: 'login.pdf' })
            // await new Promise(r => setTimeout(r, 5000))
            await browser.close()
            return String(r)

        } catch (error) {
            console.log('erro', error)
            await browser.close();

        }
    }
}
