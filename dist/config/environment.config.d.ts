declare type Environment = {
    app: {
        port: number;
    };
    database: {
        host: string;
        port: number;
        username: string;
        password: string;
        database: string;
        synchronize: boolean;
        logging: boolean;
    };
    browser: {
        ExecutablePath: string;
        product: string;
    };
};
export declare const env: Environment;
export {};
