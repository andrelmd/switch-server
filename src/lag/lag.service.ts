import { Injectable } from '@nestjs/common';
import { CreateLagDto } from './dto/create-lag.dto';
import { UpdateLagDto } from './dto/update-lag.dto';

@Injectable()
export class LagService {
  create(createLagDto: CreateLagDto) {
    return 'This action adds a new lag';
  }

  findAll() {
    return `This action returns all lag`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lag`;
  }

  update(id: number, updateLagDto: UpdateLagDto) {
    return `This action updates a #${id} lag`;
  }

  remove(id: number) {
    return `This action removes a #${id} lag`;
  }
}
