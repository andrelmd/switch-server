import { PuppeteerService } from './puppeteer.service';
export declare class PuppeteerController {
    private readonly puppeteerService;
    constructor(puppeteerService: PuppeteerService);
    test(): Promise<string>;
}
