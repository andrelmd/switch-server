import { Switch } from "src/switch/entities/switch.entity";
import { DataSource } from "typeorm";

const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "admin",
    database: "test",
    entities: [Switch],
    synchronize: false,
    logging: false,
})


export default AppDataSource