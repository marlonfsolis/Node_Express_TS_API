import sql, {pool} from "mssql";
import {Express} from "express";

import {Configuration as config} from '../utils/configuration';
import {dbDebug} from './debuggers';


const sqlConfig = {
    user: config.db.username,
    password: config.db.password,
    database: "AppTemplateDb",
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
}

const createDbConnection = (app: Express) => {
    dbDebug("Creating database connection...");

    const appPool = new sql.ConnectionPool(sqlConfig);
    // const appPool = new sql.ConnectionPool(connSting);
    appPool.connect().then(pool => {
        app.locals.db = pool;
        dbDebug("Database connected.");
    }).catch(err => {
        dbDebug("Error creating connection pool.", err);
    });
}

export default createDbConnection;
