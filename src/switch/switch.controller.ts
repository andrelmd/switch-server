import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SwitchService } from './switch.service';
import { CreateSwitchDto } from './dto/create-switch.dto';
import { UpdateSwitchDto } from './dto/update-switch.dto';

@Controller('switch')
export class SwitchController {
  constructor(private readonly switchService: SwitchService) {}

  @Post()
  create(@Body() createSwitchDto: CreateSwitchDto) {
    return this.switchService.create(createSwitchDto);
  }

  @Get()
  findAll() {
    return this.switchService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.switchService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSwitchDto: UpdateSwitchDto) {
    return this.switchService.update(+id, updateSwitchDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.switchService.remove(+id);
  }
}
