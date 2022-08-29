import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LagService } from './lag.service';
import { CreateLagDto } from './dto/create-lag.dto';
import { UpdateLagDto } from './dto/update-lag.dto';

@Controller('lag')
export class LagController {
  constructor(private readonly lagService: LagService) {}

  @Post()
  create(@Body() createLagDto: CreateLagDto) {
    return this.lagService.create(createLagDto);
  }

  @Get()
  findAll() {
    return this.lagService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lagService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLagDto: UpdateLagDto) {
    return this.lagService.update(+id, updateLagDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lagService.remove(+id);
  }
}
