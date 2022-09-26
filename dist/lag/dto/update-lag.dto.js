"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateLagDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_lag_dto_1 = require("./create-lag.dto");
class UpdateLagDto extends (0, mapped_types_1.PartialType)(create_lag_dto_1.CreateLagDto) {
}
exports.UpdateLagDto = UpdateLagDto;
//# sourceMappingURL=update-lag.dto.js.map