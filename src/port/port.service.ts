import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdatePortDto } from './dto/update-port.dto';
import { Port } from './entities/port.entity';

@Injectable()
export class PortService {
  constructor(
    @InjectRepository(Port) private readonly portsService: Repository<Port>,
  ) {}
  async findAll(deviceId: number) {
    return await this.portsService.find({ where: { deviceId } });
  }

  findOne(id: number) {
    return `This action returns a #${id} port`;
  }

  async update(updatePortDto: UpdatePortDto) {
    return await this.portsService.update(
      { number: updatePortDto.number, deviceId: updatePortDto.deviceId },
      {
        statusId: updatePortDto.statusId,
        speedId: updatePortDto.speedId,
        flowControlId: updatePortDto.flowControlId,
      },
    );
  }

  remove(id: number) {
    return `This action removes a #${id} port`;
  }
}
