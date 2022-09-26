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
exports.Lag = void 0;
const typeorm_1 = require("typeorm");
let Lag = class Lag {
};
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'switch_id', type: 'varchar' }),
    __metadata("design:type", String)
], Lag.prototype, "switchId", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'port_number0', type: 'int4' }),
    __metadata("design:type", Number)
], Lag.prototype, "portNumber0", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'port_number1', type: 'int4' }),
    __metadata("design:type", Number)
], Lag.prototype, "portNumber1", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'port_number2', type: 'int4' }),
    __metadata("design:type", Number)
], Lag.prototype, "portNumber2", void 0);
__decorate([
    (0, typeorm_1.PrimaryColumn)({ name: 'port_number3', type: 'int4' }),
    __metadata("design:type", Number)
], Lag.prototype, "portNumber3", void 0);
Lag = __decorate([
    (0, typeorm_1.Entity)('lag')
], Lag);
exports.Lag = Lag;
//# sourceMappingURL=lag.entity.js.map