import { Test, TestingModule } from '@nestjs/testing'
import { LagController } from './lag.controller'
import { LagService } from './lag.service'

describe('LagController', () => {
  let controller: LagController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LagController],
      providers: [LagService],
    }).compile()

    controller = module.get<LagController>(LagController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
