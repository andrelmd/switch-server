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
exports.DeviceService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt_1 = require("bcrypt");
const typeorm_2 = require("typeorm");
const port_entity_1 = require("../port/entities/port.entity");
const device_entity_1 = require("./entities/device.entity");
let DeviceService = class DeviceService {
    constructor(devicessRepository, portsRepository, datasource) {
        this.devicessRepository = devicessRepository;
        this.portsRepository = portsRepository;
        this.datasource = datasource;
    }
    async create({ ipAddress, password, username }) {
        const encryptedpassword = (0, bcrypt_1.hashSync)(password, 10);
        return await this.datasource.transaction(async (manager) => {
            const switchEntity = this.devicessRepository.create({
                username,
                ipAddress,
                password: encryptedpassword,
            });
            await manager.getRepository(device_entity_1.Device).save(switchEntity);
            const ports = Array();
            for (let i = 0; i < 8; i++) {
                ports.push(this.portsRepository.create({ number: i, deviceId: switchEntity.id }));
            }
            await manager.getRepository(port_entity_1.Port).save(ports);
            return switchEntity;
        });
    }
    async findAll() {
        return await this.devicessRepository.find({});
    }
    async findOne(id) {
        return await this.devicessRepository.findOneByOrFail({ id });
    }
    update(id, updateSwitchDto) {
        return `This action updates a #${id} switch`;
    }
    remove(id) {
        return `This action removes a #${id} switch`;
    }
};
DeviceService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(device_entity_1.Device)),
    __param(1, (0, typeorm_1.InjectRepository)(port_entity_1.Port)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.DataSource])
], DeviceService);
exports.DeviceService = DeviceService;
//# sourceMappingURL=device.service.js.map