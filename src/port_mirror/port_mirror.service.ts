import { Injectable } from '@nestjs/common'
import { CreatePortMirrorDto } from './dto/create-port_mirror.dto'
import { UpdatePortMirrorDto } from './dto/update-port_mirror.dto'

@Injectable()
export class PortMirrorService {
  create(createPortMirrorDto: CreatePortMirrorDto) {
    return 'This action adds a new portMirror'
  }

  findAll() {
    return `This action returns all portMirror`
  }

  findOne(id: number) {
    return `This action returns a #${id} portMirror`
  }

  update(id: number, updatePortMirrorDto: UpdatePortMirrorDto) {
    return `This action updates a #${id} portMirror`
  }

  remove(id: number) {
    return `This action removes a #${id} portMirror`
  }
}
