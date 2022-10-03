"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const firmware_controller_1 = require("./firmware.controller");
const firmware_service_1 = require("./firmware.service");
describe('FirmwareController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [firmware_controller_1.FirmwareController],
            providers: [firmware_service_1.FirmwareService],
        }).compile();
        controller = module.get(firmware_controller_1.FirmwareController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=firmware.controller.spec.js.map