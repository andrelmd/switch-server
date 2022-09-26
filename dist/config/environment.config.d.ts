import { DatabaseType } from "typeorm";
declare type Environment = {
    app: {
        port: number;
    };
    database: {
        type: DatabaseType;
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        synchronize: boolean;
        logging: boolean;
    };
};
export declare const env: Environment;
export {};
