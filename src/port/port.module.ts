import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { FlowControl } from './entities/flow-control.entity'
import { PortStatus } from './entities/port-status.entity'
import { Port } from './entities/port.entity'
import { Speed } from './entities/speed.entity'
import { PortController } from './port.controller'
import { PortService } from './port.service'

@Module({
  imports: [TypeOrmModule.forFeature([Port, FlowControl, PortStatus, Speed])],
  controllers: [PortController],
  providers: [PortService],
})
export class PortModule {}
