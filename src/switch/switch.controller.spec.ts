import { Test, TestingModule } from '@nestjs/testing';
import { SwitchController } from './switch.controller';
import { SwitchService } from './switch.service';

describe('SwitchController', () => {
  let controller: SwitchController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SwitchController],
      providers: [SwitchService],
    }).compile();

    controller = module.get<SwitchController>(SwitchController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
