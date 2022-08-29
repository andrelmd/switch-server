import { Injectable } from '@nestjs/common';
import { CreateFirmwareDto } from './dto/create-firmware.dto';
import { UpdateFirmwareDto } from './dto/update-firmware.dto';

@Injectable()
export class FirmwareService {
  create(createFirmwareDto: CreateFirmwareDto) {
    return 'This action adds a new firmware';
  }

  findAll() {
    return `This action returns all firmware`;
  }

  findOne(id: number) {
    return `This action returns a #${id} firmware`;
  }

  update(id: number, updateFirmwareDto: UpdateFirmwareDto) {
    return `This action updates a #${id} firmware`;
  }

  remove(id: number) {
    return `This action removes a #${id} firmware`;
  }
}
