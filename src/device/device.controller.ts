import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { DeviceService } from './device.service'
import { CreateDeviceDto } from './dto/create-device.dto'
import { DeviceDto } from './dto/device.dto'
import { UpdateDeviceDto } from './dto/update-device.dto'

@Controller('devices')
export class DeviceController {
  constructor(private readonly deviceService: DeviceService) {}

  @Post()
  async create(@Body() createSwitchDto: CreateDeviceDto) {
    const result = await this.deviceService.create(createSwitchDto)
    return { data: new DeviceDto(result) }
  }

  @Get()
  async findAll() {
    const result = await this.deviceService.findAll()
    return { data: result.map((it) => new DeviceDto(it)) }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const result = await this.deviceService.findOne(+id)
    return { data: new DeviceDto(result) }
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSwitchDto: UpdateDeviceDto) {
    return this.deviceService.update(+id, updateSwitchDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deviceService.remove(+id)
  }
}
