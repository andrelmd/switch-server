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
exports.PortService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const port_entity_1 = require("./entities/port.entity");
let PortService = class PortService {
    constructor(portsService) {
        this.portsService = portsService;
    }
    async findAll(deviceId) {
        return await this.portsService.find({ where: { deviceId } });
    }
    findOne(id) {
        return `This action returns a #${id} port`;
    }
    async update(updatePortDto) {
        return await this.portsService.update({ number: updatePortDto.number, deviceId: updatePortDto.deviceId }, {
            statusId: updatePortDto.statusId,
            speedId: updatePortDto.speedId,
            flowControlId: updatePortDto.flowControlId,
        });
    }
    remove(id) {
        return `This action removes a #${id} port`;
    }
};
PortService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(port_entity_1.Port)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], PortService);
exports.PortService = PortService;
//# sourceMappingURL=port.service.js.map