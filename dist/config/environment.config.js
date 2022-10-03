"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
function createEnvironment() {
    const dbType = process.env.DB_TYPE;
    const dbHost = process.env.DB_HOST;
    const dbPort = Number(process.env.DB_PORT);
    const dbUsername = process.env.DB_USERNAME;
    const dbPassword = process.env.DB_PASSWORD;
    const dbDatabase = process.env.DB_DATABASE;
    const dbSynchronize = process.env.DB_SYNCHRONIZE === 'true' ? true : false;
    const dbLogging = process.env.DB_LOGGING === 'true' ? true : false;
    if (!dbType)
        throw new Error('Env variable DB_TYPE not defined');
    if (!dbHost)
        throw new Error('Env variable DB_HOST not defined');
    if (!dbPort)
        throw new Error('Env variable DB_PORT not defined');
    if (isNaN(dbPort))
        throw new Error('Env variable DB_PORT is not a number');
    if (!dbUsername)
        throw new Error('Env variable DB_USERNAME not defined');
    if (!dbPassword)
        throw new Error('Env variable DB_PASSWORD not defined');
    if (!dbDatabase)
        throw new Error('Env variable DB_DATABASE not defined');
    const appPort = Number(process.env.APP_PORT);
    if (!appPort)
        throw new Error('Env variable APP_PORT not defined');
    if (isNaN(appPort))
        throw new Error('Env variable APP_PORT is not a number');
    const browserExecutablePath = process.env.BROWSER_EXECUTABLE_PATH;
    const browserProduct = process.env.BROWSER_PRODUCT;
    if (!browserExecutablePath)
        throw new Error('Env variable BROWSER_EXECUTABLE_PATH not defined');
    if (!browserProduct)
        throw new Error('Env variable BROWSER_PRODUCT not defined');
    const env = {
        app: {
            port: appPort,
        },
        database: {
            host: dbHost,
            port: dbPort,
            username: dbUsername,
            password: dbPassword,
            database: dbDatabase,
            synchronize: dbSynchronize,
            logging: dbLogging,
        },
        browser: {
            ExecutablePath: browserExecutablePath,
            product: browserProduct,
        },
    };
    return env;
}
exports.env = createEnvironment();
//# sourceMappingURL=environment.config.js.map