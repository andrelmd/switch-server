import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Port } from '../port/entities/port.entity'
import { DeviceController } from './device.controller'
import { DeviceService } from './device.service'
import { Device } from './entities/device.entity'

@Module({
  imports: [TypeOrmModule.forFeature([Device, Port])],
  controllers: [DeviceController],
  providers: [DeviceService],
})
export class DeviceModule {}
