import { Module } from '@nestjs/common';
import { PortMirrorService } from './port_mirror.service';
import { PortMirrorController } from './port_mirror.controller';

@Module({
  controllers: [PortMirrorController],
  providers: [PortMirrorService]
})
export class PortMirrorModule {}
