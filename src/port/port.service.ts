import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UpdatePortDto } from './dto/update-port.dto'
import { FlowControl } from './entities/flow-control.entity'
import { PortStatus } from './entities/port-status.entity'
import { Port } from './entities/port.entity'
import { Speed } from './entities/speed.entity'

@Injectable()
export class PortService {
  constructor(
    @InjectRepository(Port) private readonly portsService: Repository<Port>,
    @InjectRepository(FlowControl)
    private readonly flowControlService: Repository<FlowControl>,
    @InjectRepository(Speed) private readonly speedsService: Repository<Speed>,
    @InjectRepository(PortStatus)
    private readonly portStatusService: Repository<PortStatus>,
  ) {}
  async findAll(deviceId: number) {
    return await this.portsService.find({ where: { deviceId } })
  }

  findOne(id: number) {
    return `This action returns a #${id} port`
  }

  async update(updatePortDto: UpdatePortDto) {
    return await this.portsService.update(
      { number: updatePortDto.number, deviceId: updatePortDto.deviceId },
      {
        statusId: updatePortDto.statusId,
        speedId: updatePortDto.speedId,
        flowControlId: updatePortDto.flowControlId,
      },
    )
  }

  async findAllFlowControl() {
    return await this.flowControlService.find()
  }

  async findAllSpeeds() {
    return await this.speedsService.find()
  }

  async findAllportStatus() {
    return await this.portStatusService.find()
  }

  remove(id: number) {
    return `This action removes a #${id} port`
  }
}
