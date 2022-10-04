import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Port } from './entities/port.entity'
import { PortController } from './port.controller'
import { PortService } from './port.service'

@Module({
  imports: [TypeOrmModule.forFeature([Port])],
  controllers: [PortController],
  providers: [PortService],
})
export class PortModule {}
