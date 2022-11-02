import { Injectable } from '@nestjs/common'
import { Cron, CronExpression } from '@nestjs/schedule'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Device } from '../device/entities/device.entity'
import { Crawler } from './crawler'

@Injectable()
export class ScrapperService {
  constructor(
    @InjectRepository(Device)
    private readonly devicesRepository: Repository<Device>,
  ) {}

  @Cron(CronExpression.EVERY_5_MINUTES)
  async updatePorts() {
    console.info('[INFO]: Initalizing cron job to update ports for devices')

    const crawler = await Crawler.init()
    try {
      if (!crawler) throw new Error('Crawler is null')
      const devices = await this.devicesRepository.find({
        relations: ['ports'],
      })
      if (!devices.length) {
        console.info('[INFO]: No devices found, exiting...')
        return
      }
      console.info(`[INFO]: Updating ${devices.length} devices`)
      for await (const device of devices) {
        await crawler.loginToSwitch(
          `http://${device.ipAddress}`,
          device.username,
          device.password,
        )
        const ports = device.ports
        for await (const port of ports) {
          await crawler.changePortStatus(port)
        }
      }
    } catch (error) {
      console.error(`[ERROR]: Could not update ports ${error.message}`)
    } finally {
      await crawler.closeBrowser()
    }
  }
}
