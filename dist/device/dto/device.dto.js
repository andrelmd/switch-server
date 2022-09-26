"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeviceDto = void 0;
const port_dto_1 = require("../../port/dto/port.dto");
class DeviceDto {
    constructor(device) {
        this.id = device.id;
        this.ipAddress = device.ipAddress;
        this.username = device.username;
        this.createdAt = device.createdAt;
        this.updatedAt = device.updatedAt;
        device.ports
            ? (this.ports = device.ports.map((port) => new port_dto_1.PortDto(port)))
            : undefined;
    }
}
exports.DeviceDto = DeviceDto;
//# sourceMappingURL=device.dto.js.map