import { Test, TestingModule } from '@nestjs/testing'
import { LagService } from './lag.service'

describe('LagService', () => {
  let service: LagService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LagService],
    }).compile()

    service = module.get<LagService>(LagService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
