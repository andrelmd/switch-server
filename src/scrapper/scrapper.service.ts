import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Device } from '../device/entities/device.entity'
import { Port } from '../port/entities/port.entity'
import { Crawler } from './crawler'
import { FlowControl } from './enums/flow-control.enum'
import { Speed } from './enums/speed.enum'
import { State } from './enums/state.enum'

@Injectable()
export class ScrapperService {
  constructor(
    @InjectRepository(Device)
    private readonly devicesRepository: Repository<Device>,
  ) {}

  async updatePorts() {
    const devices = await this.devicesRepository.find({ relations: ['ports'] })
    const crawler = await Crawler.init()
    devices.forEach(async (device) => {
      await crawler.loginToSwitch(
        device.ipAddress,
        device.username,
        device.password,
      )
      await Promise.all([
        device.ports.forEach(async (port) => {
          await crawler.changePortStatus(
            Port[port.number],
            port.statusId ? State.Enable : State.Disable,
            Speed.Auto,
            FlowControl.Off,
          )
        }),
      ])
    })
    await crawler.browser.close()
  }
}
