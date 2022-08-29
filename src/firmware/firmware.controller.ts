import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FirmwareService } from './firmware.service';
import { CreateFirmwareDto } from './dto/create-firmware.dto';
import { UpdateFirmwareDto } from './dto/update-firmware.dto';

@Controller('firmware')
export class FirmwareController {
  constructor(private readonly firmwareService: FirmwareService) {}

  @Post()
  create(@Body() createFirmwareDto: CreateFirmwareDto) {
    return this.firmwareService.create(createFirmwareDto);
  }

  @Get()
  findAll() {
    return this.firmwareService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.firmwareService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFirmwareDto: UpdateFirmwareDto) {
    return this.firmwareService.update(+id, updateFirmwareDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.firmwareService.remove(+id);
  }
}
