import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common'
import { UpdatePortDto } from './dto/update-port.dto'
import { FlowControl } from './enums/flow-control.enum'
import { Speeds } from './enums/speeds.enum'
import { States } from './enums/states.enum'
import { PortService } from './port.service'

@Controller('ports')
export class PortController {
  constructor(private readonly portService: PortService) {}

  @Get('/flow-control')
  async getFlowControl() {
    return { data: FlowControl }
  }
  @Get('/speeds')
  async GetSpeed() {
    return { data: Speeds }
  }

  @Get('/states')
  async getStates() {
    return { data: States }
  }

  @Get(':deviceId')
  async findAll(@Param('deviceId') deviceId: string) {
    const result = await this.portService.findAll(+deviceId)
    return { data: result }
  }

  @Patch()
  update(@Body() updatePortDto: UpdatePortDto) {
    return this.portService.update(updatePortDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.portService.remove(+id)
  }
}
