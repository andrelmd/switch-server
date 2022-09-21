import { DatabaseType } from "typeorm"

const databaseTypeValues = ["mysql", "postgres", "cockroachdb", "sap", "mariadb", "sqlite", "cordova", "react-native", "nativescript", "sqljs", "oracle", "mssql", "mongodb", "aurora-mysql", "aurora-postgres", "expo", "better-sqlite3", "capacitor", "spanner"]

type Environment = {
    app: {
        port: number
    }
    database: {
        type: DatabaseType,
        host: string,
        port: number,
        username: string,
        password: string,
        database: string,
        synchronize: boolean,
        logging: boolean,
    }
}

function createEnvironment(): Environment {


    const dbType: string = process.env.DB_TYPE
    const dbHost: string = process.env.DB_HOST
    const dbPort: number = Number(process.env.DB_PORT)
    const dbUsername: string = process.env.DB_USERNAME
    const dbPassword: string = process.env.DB_PASSWORD
    const dbDatabase: string = process.env.DB_DATABASE
    const dbSynchronize: boolean = process.env.DB_SYNCHRONIZE === 'true' ? true : false
    const dbLogging: boolean = process.env.DB_LOGGING === 'true' ? true : false


    if (!dbType) throw new Error('Env variable DB_TYPE not defined')
    if (!databaseTypeValues.includes(dbType)) throw new Error('Env variable DB_TYPE is not valid')
    if (!dbHost) throw new Error('Env variable DB_HOST not defined')
    if (!dbPort) throw new Error('Env variable DB_PORT not defined')
    if (isNaN(dbPort)) throw new Error('Env variable DB_PORT is not a number')
    if (!dbUsername) throw new Error('Env variable DB_USERNAME not defined')
    if (!dbPassword) throw new Error('Env variable DB_PASSWORD not defined')
    if (!dbDatabase) throw new Error('Env variable DB_DATABASE not defined')


    const appPort: number = Number(process.env.APP_PORT)

    if (!appPort) throw new Error('Env variable APP_PORT not defined')
    if (isNaN(appPort)) throw new Error('Env variable APP_PORT is not a number')


    const env: Environment = {

        app: {
            port: appPort
        },

        database: {
            type: dbType as DatabaseType,
            host: dbHost,
            port: dbPort,
            username: dbUsername,
            password: dbPassword,
            database: dbDatabase,
            synchronize: dbSynchronize,
            logging: dbLogging,
        }
    }
    return env
}

export const env = createEnvironment()