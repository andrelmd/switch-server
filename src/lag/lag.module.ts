import { Module } from '@nestjs/common';
import { LagService } from './lag.service';
import { LagController } from './lag.controller';

@Module({
  controllers: [LagController],
  providers: [LagService]
})
export class LagModule {}
