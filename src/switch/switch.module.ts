import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Port } from '../port/entities/port.entity';
import { Switch } from './entities/switch.entity';
import { SwitchController } from './switch.controller';
import { SwitchService } from './switch.service';

@Module({
  imports: [TypeOrmModule.forFeature([Switch, Port])],
  controllers: [SwitchController],
  providers: [SwitchService]
})
export class SwitchModule { }
