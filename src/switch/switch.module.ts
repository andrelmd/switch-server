import { Module } from '@nestjs/common';
import { SwitchService } from './switch.service';
import { SwitchController } from './switch.controller';

@Module({
  controllers: [SwitchController],
  providers: [SwitchService]
})
export class SwitchModule {}
