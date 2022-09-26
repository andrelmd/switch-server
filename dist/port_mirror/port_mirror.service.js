"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortMirrorService = void 0;
const common_1 = require("@nestjs/common");
let PortMirrorService = class PortMirrorService {
    create(createPortMirrorDto) {
        return 'This action adds a new portMirror';
    }
    findAll() {
        return `This action returns all portMirror`;
    }
    findOne(id) {
        return `This action returns a #${id} portMirror`;
    }
    update(id, updatePortMirrorDto) {
        return `This action updates a #${id} portMirror`;
    }
    remove(id) {
        return `This action removes a #${id} portMirror`;
    }
};
PortMirrorService = __decorate([
    (0, common_1.Injectable)()
], PortMirrorService);
exports.PortMirrorService = PortMirrorService;
//# sourceMappingURL=port_mirror.service.js.map