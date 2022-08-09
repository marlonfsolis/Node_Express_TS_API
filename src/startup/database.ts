import {Express} from "express";

import {dbDebug} from './debuggers';
import db from "../shared/Database";


const createDbConnection = (app: Express) => {
    dbDebug("Creating database connection...");

    db.getDbConnection().then(pool => {
        app.locals.db = pool;
        dbDebug("Database connected.");
    });
}

export default createDbConnection;
