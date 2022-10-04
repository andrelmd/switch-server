import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Device } from '../device/entities/device.entity'
import { ScrapperController } from './scrapper.controller'
import { ScrapperService } from './scrapper.service'

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  controllers: [ScrapperController],
  providers: [ScrapperService],
})
export class ScrapperModule {}
