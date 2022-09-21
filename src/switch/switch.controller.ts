import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateSwitchDto } from './dto/create-switch.dto';
import { SwitchDto } from './dto/switch.dto';
import { UpdateSwitchDto } from './dto/update-switch.dto';
import { SwitchService } from './switch.service';

@Controller('switch')
export class SwitchController {
  constructor(private readonly switchService: SwitchService) { }

  @Post()
  async create(@Body() createSwitchDto: CreateSwitchDto) {
    try {
      const result = await this.switchService.create(createSwitchDto);
      return { data: new SwitchDto(result) }
    } catch (error) {
    }
  }

  @Get()
  async findAll() {
    try {
      const result = await this.switchService.findAll()
      return { data: result.map(it => new SwitchDto(it)) }
    } catch (error) {

    };
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      const result = await this.switchService.findOne(+id);
      return { data: new SwitchDto(result) }
    } catch (error) {

    }
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
