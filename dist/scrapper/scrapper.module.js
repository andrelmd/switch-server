"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapperModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const device_entity_1 = require("../device/entities/device.entity");
const scrapper_controller_1 = require("./scrapper.controller");
const scrapper_service_1 = require("./scrapper.service");
let ScrapperModule = class ScrapperModule {
};
ScrapperModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([device_entity_1.Device])],
        controllers: [scrapper_controller_1.ScrapperController],
        providers: [scrapper_service_1.ScrapperService],
    })
], ScrapperModule);
exports.ScrapperModule = ScrapperModule;
//# sourceMappingURL=scrapper.module.js.map