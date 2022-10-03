"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const port_mirror_controller_1 = require("./port_mirror.controller");
const port_mirror_service_1 = require("./port_mirror.service");
describe('PortMirrorController', () => {
    let controller;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            controllers: [port_mirror_controller_1.PortMirrorController],
            providers: [port_mirror_service_1.PortMirrorService],
        }).compile();
        controller = module.get(port_mirror_controller_1.PortMirrorController);
    });
    it('should be defined', () => {
        expect(controller).toBeDefined();
    });
});
//# sourceMappingURL=port_mirror.controller.spec.js.map