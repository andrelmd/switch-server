"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePortMirrorDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_port_mirror_dto_1 = require("./create-port_mirror.dto");
class UpdatePortMirrorDto extends (0, mapped_types_1.PartialType)(create_port_mirror_dto_1.CreatePortMirrorDto) {
}
exports.UpdatePortMirrorDto = UpdatePortMirrorDto;
//# sourceMappingURL=update-port_mirror.dto.js.map