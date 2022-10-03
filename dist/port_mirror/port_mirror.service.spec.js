"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const port_mirror_service_1 = require("./port_mirror.service");
describe('PortMirrorService', () => {
    let service;
    beforeEach(async () => {
        const module = await testing_1.Test.createTestingModule({
            providers: [port_mirror_service_1.PortMirrorService],
        }).compile();
        service = module.get(port_mirror_service_1.PortMirrorService);
    });
    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});
//# sourceMappingURL=port_mirror.service.spec.js.map