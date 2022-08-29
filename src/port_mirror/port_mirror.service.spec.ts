import { Test, TestingModule } from '@nestjs/testing';
import { PortMirrorService } from './port_mirror.service';

describe('PortMirrorService', () => {
  let service: PortMirrorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PortMirrorService],
    }).compile();

    service = module.get<PortMirrorService>(PortMirrorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
