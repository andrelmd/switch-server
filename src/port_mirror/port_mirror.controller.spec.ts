import { Test, TestingModule } from '@nestjs/testing'
import { PortMirrorController } from './port_mirror.controller'
import { PortMirrorService } from './port_mirror.service'

describe('PortMirrorController', () => {
  let controller: PortMirrorController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PortMirrorController],
      providers: [PortMirrorService],
    }).compile()

    controller = module.get<PortMirrorController>(PortMirrorController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
