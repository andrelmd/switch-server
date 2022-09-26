"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateFirmwareDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_firmware_dto_1 = require("./create-firmware.dto");
class UpdateFirmwareDto extends (0, mapped_types_1.PartialType)(create_firmware_dto_1.CreateFirmwareDto) {
}
exports.UpdateFirmwareDto = UpdateFirmwareDto;
//# sourceMappingURL=update-firmware.dto.js.map