"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appDatabase = void 0;
const typeorm_1 = require("@nestjs/typeorm");
const environment_config_1 = require("../../config/environment.config");
const device_entity_1 = require("../../device/entities/device.entity");
const port_entity_1 = require("../../port/entities/port.entity");
exports.appDatabase = typeorm_1.TypeOrmModule.forRootAsync({
    useFactory: async () => {
        return {
            type: 'mysql',
            host: environment_config_1.env.database.host,
            port: environment_config_1.env.database.port,
            database: environment_config_1.env.database.database,
            username: environment_config_1.env.database.username,
            password: environment_config_1.env.database.password,
            synchronize: environment_config_1.env.database.synchronize,
            logging: environment_config_1.env.database.logging,
            entities: [device_entity_1.Device, port_entity_1.Port],
        };
    },
});
//# sourceMappingURL=data-source.js.map