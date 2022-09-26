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
exports.Device = void 0;
const typeorm_1 = require("typeorm");
const port_entity_1 = require("../../port/entities/port.entity");
let Device = class Device {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('increment', { name: 'id', type: 'integer' }),
    __metadata("design:type", Number)
], Device.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ip_address', type: 'varchar' }),
    __metadata("design:type", String)
], Device.prototype, "ipAddress", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'username', type: 'varchar' }),
    __metadata("design:type", String)
], Device.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'password', type: 'varchar' }),
    __metadata("design:type", String)
], Device.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP()',
    }),
    __metadata("design:type", Date)
], Device.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP()',
    }),
    __metadata("design:type", Date)
], Device.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => port_entity_1.Port, (port) => port.device),
    __metadata("design:type", Array)
], Device.prototype, "ports", void 0);
Device = __decorate([
    (0, typeorm_1.Entity)('devices')
], Device);
exports.Device = Device;
//# sourceMappingURL=device.entity.js.map