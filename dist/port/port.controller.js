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
exports.PortController = void 0;
const common_1 = require("@nestjs/common");
const update_port_dto_1 = require("./dto/update-port.dto");
const flow_control_enum_1 = require("./enums/flow-control.enum");
const speeds_enum_1 = require("./enums/speeds.enum");
const states_enum_1 = require("./enums/states.enum");
const port_service_1 = require("./port.service");
let PortController = class PortController {
    constructor(portService) {
        this.portService = portService;
    }
    async getFlowControl() {
        return { data: flow_control_enum_1.FlowControl };
    }
    async GetSpeed() {
        return { data: speeds_enum_1.Speeds };
    }
    async getStates() {
        return { data: states_enum_1.States };
    }
    async findAll(deviceId) {
        const result = await this.portService.findAll(+deviceId);
        return { data: result };
    }
    update(updatePortDto) {
        return this.portService.update(updatePortDto);
    }
    remove(id) {
        return this.portService.remove(+id);
    }
};
__decorate([
    (0, common_1.Get)('/flow-control'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PortController.prototype, "getFlowControl", null);
__decorate([
    (0, common_1.Get)('/speeds'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PortController.prototype, "GetSpeed", null);
__decorate([
    (0, common_1.Get)('/states'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PortController.prototype, "getStates", null);
__decorate([
    (0, common_1.Get)(':deviceId'),
    __param(0, (0, common_1.Param)('deviceId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PortController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [update_port_dto_1.UpdatePortDto]),
    __metadata("design:returntype", void 0)
], PortController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PortController.prototype, "remove", null);
PortController = __decorate([
    (0, common_1.Controller)('ports'),
    __metadata("design:paramtypes", [port_service_1.PortService])
], PortController);
exports.PortController = PortController;
//# sourceMappingURL=port.controller.js.map