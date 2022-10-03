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
exports.Firmware = void 0;
const typeorm_1 = require("typeorm");
let Firmware = class Firmware {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'id', type: 'varchar', default: () => 'UUID()' }),
    __metadata("design:type", String)
], Firmware.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'version', type: 'string' }),
    __metadata("design:type", String)
], Firmware.prototype, "version", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'switch_model', type: 'int4' }),
    __metadata("design:type", Number)
], Firmware.prototype, "switchModelId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'binary', type: 'blob' }),
    __metadata("design:type", Buffer)
], Firmware.prototype, "binary", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)({
        name: 'created_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP()',
    }),
    __metadata("design:type", Date)
], Firmware.prototype, "createdAt", void 0);
__decorate([
    (0, typeorm_1.UpdateDateColumn)({
        name: 'updated_at',
        type: 'timestamptz',
        default: () => 'CURRENT_TIMESTAMP()',
    }),
    __metadata("design:type", Date)
], Firmware.prototype, "updatedAt", void 0);
Firmware = __decorate([
    (0, typeorm_1.Entity)('firmware')
], Firmware);
exports.Firmware = Firmware;
//# sourceMappingURL=firmware.entity.js.map