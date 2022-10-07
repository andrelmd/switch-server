import { Module } from '@nestjs/common'
import { ScheduleModule } from '@nestjs/schedule'
import { DeviceModule } from '../device/device.module'
import { PortModule } from '../port/port.module'
import { ScrapperModule } from '../scrapper/scrapper.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { appDatabase } from './data-source/data-source'

@Module({
  imports: [
    appDatabase,
    DeviceModule,
    PortModule,
    ScrapperModule,
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
