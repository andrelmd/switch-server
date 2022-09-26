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
exports.FirmwareController = void 0;
const common_1 = require("@nestjs/common");
const firmware_service_1 = require("./firmware.service");
const create_firmware_dto_1 = require("./dto/create-firmware.dto");
const update_firmware_dto_1 = require("./dto/update-firmware.dto");
let FirmwareController = class FirmwareController {
    constructor(firmwareService) {
        this.firmwareService = firmwareService;
    }
    create(createFirmwareDto) {
        return this.firmwareService.create(createFirmwareDto);
    }
    findAll() {
        return this.firmwareService.findAll();
    }
    findOne(id) {
        return this.firmwareService.findOne(+id);
    }
    update(id, updateFirmwareDto) {
        return this.firmwareService.update(+id, updateFirmwareDto);
    }
    remove(id) {
        return this.firmwareService.remove(+id);
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_firmware_dto_1.CreateFirmwareDto]),
    __metadata("design:returntype", void 0)
], FirmwareController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], FirmwareController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FirmwareController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_firmware_dto_1.UpdateFirmwareDto]),
    __metadata("design:returntype", void 0)
], FirmwareController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], FirmwareController.prototype, "remove", null);
FirmwareController = __decorate([
    (0, common_1.Controller)('firmware'),
    __metadata("design:paramtypes", [firmware_service_1.FirmwareService])
], FirmwareController);
exports.FirmwareController = FirmwareController;
//# sourceMappingURL=firmware.controller.js.map