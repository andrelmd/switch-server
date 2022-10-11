import { DynamicModule } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { env } from '../../config/environment.config'
import { Device } from '../../device/entities/device.entity'
import { FlowControl } from '../../port/entities/flow-control.entity'
import { PortStatus } from '../../port/entities/port-status.entity'
import { Port } from '../../port/entities/port.entity'
import { Speed } from '../../port/entities/speed.entity'

export const appDatabase: DynamicModule = TypeOrmModule.forRootAsync({
  useFactory: async () => {
    return {
      type: 'mysql',
      host: env.database.host,
      port: env.database.port,
      database: env.database.database,
      username: env.database.username,
      password: env.database.password,
      synchronize: env.database.synchronize,
      logging: env.database.logging,
      entities: [Device, Port, FlowControl, PortStatus, Speed],
    }
  },
})
