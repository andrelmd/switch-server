import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PuppeteerModule } from '../puppeteer/puppeteer.module';
import { SwitchModule } from '../switch/switch.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SwitchModule, PuppeteerModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
