"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PuppeteerController = void 0;
const common_1 = require("@nestjs/common");
const puppeteer_service_1 = require("./puppeteer.service");
let PuppeteerController = class PuppeteerController {
    constructor(puppeteerService) {
        this.puppeteerService = puppeteerService;
    }
    async test() {
        return await this.puppeteerService.find();
    }
};
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PuppeteerController.prototype, "test", null);
PuppeteerController = __decorate([
    (0, common_1.Controller)('puppeteer'),
    __metadata("design:paramtypes", [puppeteer_service_1.PuppeteerService])
], PuppeteerController);
exports.PuppeteerController = PuppeteerController;
//# sourceMappingURL=puppeteer.controller.js.map