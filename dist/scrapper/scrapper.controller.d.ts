import { ScrapperService } from './scrapper.service';
export declare class ScrapperController {
    private readonly scrapperService;
    constructor(scrapperService: ScrapperService);
    test(): Promise<void>;
}
