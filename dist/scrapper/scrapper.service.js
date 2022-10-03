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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ScrapperService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const device_entity_1 = require("../device/entities/device.entity");
const port_entity_1 = require("../port/entities/port.entity");
const crawler_1 = require("./crawler");
const flow_control_enum_1 = require("./enums/flow-control.enum");
const speed_enum_1 = require("./enums/speed.enum");
const state_enum_1 = require("./enums/state.enum");
let ScrapperService = class ScrapperService {
    constructor(devicesRepository) {
        this.devicesRepository = devicesRepository;
    }
    async updatePorts() {
        const devices = await this.devicesRepository.find({ relations: ['ports'] });
        const crawler = await crawler_1.Crawler.init();
        devices.forEach(async (device) => {
            await crawler.loginToSwitch(device.ipAddress, device.username, device.password);
            await Promise.all([
                device.ports.forEach(async (port) => {
                    await crawler.changePortStatus(port_entity_1.Port[port.number], port.statusId ? state_enum_1.State.Enable : state_enum_1.State.Disable, speed_enum_1.Speed.Auto, flow_control_enum_1.FlowControl.Off);
                }),
            ]);
        });
        await crawler.browser.close();
    }
};
ScrapperService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(device_entity_1.Device)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ScrapperService);
exports.ScrapperService = ScrapperService;
//# sourceMappingURL=scrapper.service.js.map