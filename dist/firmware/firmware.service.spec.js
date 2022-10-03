"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const firmware_service_1 = require("./firmware.service");
describe('FirmwareService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [firmware_service_1.FirmwareService],
        }).compile();
        service = module.get(firmware_service_1.FirmwareService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=firmware.service.spec.js.map