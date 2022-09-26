import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import { DataSource, Repository } from 'typeorm';
import { Port } from '../port/entities/port.entity';
import { CreateDeviceDto } from './dto/create-device.dto';
import { UpdateDeviceDto } from './dto/update-device.dto';
import { Device } from './entities/device.entity';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly devicessRepository: Repository<Device>,
    @InjectRepository(Port) private readonly portsRepository: Repository<Port>,
    private readonly datasource: DataSource,
  ) {}
  async create({ ipAddress, password, username }: CreateDeviceDto) {
    const encryptedpassword = hashSync(password, 10);

    return await this.datasource.transaction(async (manager) => {
      const switchEntity = this.devicessRepository.create({
        username,
        ipAddress,
        password: encryptedpassword,
      });
      await manager.getRepository(Device).save(switchEntity);
      const ports = Array<Port>();
      for (let i = 0; i < 8; i++) {
        ports.push(
          this.portsRepository.create({ number: i, deviceId: switchEntity.id }),
        );
      }
      await manager.getRepository(Port).save(ports);
      return switchEntity;
    });
  }

  async findAll() {
    return await this.devicessRepository.find({});
  }

  async findOne(id: number) {
    return await this.devicessRepository.findOneByOrFail({ id });
  }

  update(id: number, updateSwitchDto: UpdateDeviceDto) {
    return `This action updates a #${id} switch`;
  }

  remove(id: number) {
    return `This action removes a #${id} switch`;
  }
}
