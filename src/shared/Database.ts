import sql from "mssql";

import {Configuration as config} from '../utils/configuration';
import {dbDebug} from '../startup/debuggers';


export class Database {
    private readonly sqlConfig: sql.config;

    constructor() {
        this.sqlConfig = {
            user: config.db.username,
            password: config.db.password,
            database: config.db.name,
            server: config.db.host,
            pool: {
                max: 10,
                min: 0,
                idleTimeoutMillis: 30000
            },
            options: {
                encrypt: true, // for azure
                trustServerCertificate: config.db.trustServerCertificate // change to true for local dev / self-signed certs
            }
        };
    }

    async getDbConnection() {
        try {
            const appPool = new sql.ConnectionPool(this.sqlConfig);
            return await appPool.connect();
        } catch (err) {
            const errMsg = "Error creating connection pool.";
            dbDebug(errMsg, err);
            throw Error(errMsg);
        }
    }
}

export default new Database();

// const sqlConfig = {
//     user: config.db.username,
//     password: config.db.password,
//     database: config.db.name,
//     server: config.db.host,
//     pool: {
//         max: 10,
//         min: 0,
//         idleTimeoutMillis: 30000
//     },
//     options: {
//         encrypt: true, // for azure
//         trustServerCertificate: config.db.trustServerCertificate // change to true for local dev / self-signed certs
//     }
// }

// export const getDbConnection = async () => {
//     try {
//         const appPool = new sql.ConnectionPool(sqlConfig);
//         return await appPool.connect();
//     } catch (err) {
//         const errMsg = "Error creating connection pool.";
//         dbDebug(errMsg, err);
//         throw Error(errMsg);
//     }
// }

