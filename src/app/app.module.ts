import { Module } from '@nestjs/common';
import { SwitchModule } from '../switch/switch.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { appDatabase } from './data-source/data-source';

@Module({
  imports: [appDatabase, SwitchModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
