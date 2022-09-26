"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PortDto = void 0;
class PortDto {
    constructor(port) {
        this.switchId = port.deviceId;
        this.number = port.number;
        this.statusId = port.statusId;
        this.speedId = port.speedId;
        this.flowControlId = port.flowControlId;
    }
}
exports.PortDto = PortDto;
//# sourceMappingURL=port.dto.js.map