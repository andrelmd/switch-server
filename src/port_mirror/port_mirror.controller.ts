import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PortMirrorService } from './port_mirror.service';
import { CreatePortMirrorDto } from './dto/create-port_mirror.dto';
import { UpdatePortMirrorDto } from './dto/update-port_mirror.dto';

@Controller('port-mirror')
export class PortMirrorController {
  constructor(private readonly portMirrorService: PortMirrorService) {}

  @Post()
  create(@Body() createPortMirrorDto: CreatePortMirrorDto) {
    return this.portMirrorService.create(createPortMirrorDto);
  }

  @Get()
  findAll() {
    return this.portMirrorService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.portMirrorService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePortMirrorDto: UpdatePortMirrorDto) {
    return this.portMirrorService.update(+id, updatePortMirrorDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portMirrorService.remove(+id);
  }
}
