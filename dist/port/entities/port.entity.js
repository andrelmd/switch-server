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
exports.Port = void 0;
const typeorm_1 = require("typeorm");
const device_entity_1 = require("../../device/entities/device.entity");
let Port = class Port {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'device_id', type: 'integer' }),
    __metadata("design:type", Number)
], Port.prototype, "deviceId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'number', type: 'integer' }),
    __metadata("design:type", Number)
], Port.prototype, "number", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'status_id', type: 'integer' }),
    __metadata("design:type", Number)
], Port.prototype, "statusId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'speed_id', type: 'integer' }),
    __metadata("design:type", Number)
], Port.prototype, "speedId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'flow_control_id', type: 'integer' }),
    __metadata("design:type", Number)
], Port.prototype, "flowControlId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => device_entity_1.Device),
    (0, typeorm_1.JoinColumn)({ name: 'device_id' }),
    __metadata("design:type", device_entity_1.Device)
], Port.prototype, "device", void 0);
Port = __decorate([
    (0, typeorm_1.Entity)('ports')
], Port);
exports.Port = Port;
//# sourceMappingURL=port.entity.js.map