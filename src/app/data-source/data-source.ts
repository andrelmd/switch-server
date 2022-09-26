import { DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { env } from '../../config/environment.config';
import { Device } from '../../device/entities/device.entity';
import { Port } from '../../port/entities/port.entity';

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
      entities: [Device, Port],
    };
  },
});
