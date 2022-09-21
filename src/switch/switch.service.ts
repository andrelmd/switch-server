import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { hashSync } from 'bcrypt';
import { DataSource, Repository } from 'typeorm';
import { Port } from '../port/entities/port.entity';
import { CreateSwitchDto } from './dto/create-switch.dto';
import { UpdateSwitchDto } from './dto/update-switch.dto';
import { Switch } from './entities/switch.entity';

@Injectable()
export class SwitchService {
  constructor(@InjectRepository(Switch) private readonly switchsRepository: Repository<Switch>,
    @InjectRepository(Port) private readonly portsRepository: Repository<Port>,
    private readonly datasource: DataSource) { }
  async create({ ipAddress, password, username }: CreateSwitchDto) {
    const encryptedpassword = hashSync(password, 10)


    return await this.datasource.transaction(async manager => {
      const switchEntity = this.switchsRepository.create({ username, ipAddress, password: encryptedpassword })
      await manager.getRepository(Switch).save(switchEntity)
      const ports = Array<Port>()
      for (let i = 0; i < 8; i++) {
        ports.push(this.portsRepository.create({ number: i, switchId: switchEntity.id }))
      }
      await manager.getRepository(Port).save(ports)
      return switchEntity
    })
  }

  async findAll() {
    return await this.switchsRepository.find({ relations: ['ports'] });
  }

  async findOne(id: number) {
    return await this.switchsRepository.findOneByOrFail({ id });
  }

  update(id: number, updateSwitchDto: UpdateSwitchDto) {
    return `This action updates a #${id} switch`;
  }

  remove(id: number) {
    return `This action removes a #${id} switch`;
  }
}
