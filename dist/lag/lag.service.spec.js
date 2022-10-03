"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const lag_service_1 = require("./lag.service");
describe('LagService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [lag_service_1.LagService],
        }).compile();
        service = module.get(lag_service_1.LagService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=lag.service.spec.js.map