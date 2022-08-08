import {Express} from "express";

import {dbDebug} from './debuggers';
import * as db from "../shared/database";


const createDbConnection = (app: Express) => {
    dbDebug("Creating database connection...");

    db.getDbConnection().then(pool => {
        app.locals.db = pool;
        dbDebug("Database connected.");
    });
}

export default createDbConnection;
