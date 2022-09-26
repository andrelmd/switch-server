"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PuppeteerService = void 0;
const common_1 = require("@nestjs/common");
const puppeteer = require("puppeteer");
let PuppeteerService = class PuppeteerService {
    async find(elapsedTime = new Date()) {
        const browser = await puppeteer.launch({ headless: false, args: ['--disable-features=site-per-process'] });
        try {
            const page = await browser.newPage();
            await page.goto('http://192.168.1.1/login.html');
            let frame = page.frames().find((it => it.name() === 'loginPage'));
            const userInput = await frame.waitForSelector('input[id=User]');
            await userInput.type('user');
            const passwordInput = await frame.waitForSelector('input[id=Passwd]');
            await passwordInput.type('user1234');
            const loginButton = await frame.waitForSelector('input[id=submit]');
            loginButton.click();
            await Promise.all([
                page.waitForNavigation({ timeout: 1000 }).catch(async () => { await browser.close(); console.log(`${(new Date().getTime() - elapsedTime.getTime()) / 1000}`); return await this.find(elapsedTime); })
            ]);
            frame = page.frames().find((it => it.name() === 'loginPage'));
            const r = await page.content();
            const logoutButton = await frame.waitForSelector('span[id=headerLogoutSpan]');
            logoutButton.click();
            await Promise.all([
                page.waitForNavigation()
            ]);
            await browser.close();
            return String(r);
        }
        catch (error) {
            console.log('erro', error);
            await browser.close();
        }
    }
};
PuppeteerService = __decorate([
    (0, common_1.Injectable)()
], PuppeteerService);
exports.PuppeteerService = PuppeteerService;
//# sourceMappingURL=puppeteer.service.js.map