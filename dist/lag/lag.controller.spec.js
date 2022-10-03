"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const lag_controller_1 = require("./lag.controller");
const lag_service_1 = require("./lag.service");
describe('LagController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [lag_controller_1.LagController],
            providers: [lag_service_1.LagService],
        }).compile();
        controller = module.get(lag_controller_1.LagController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=lag.controller.spec.js.map