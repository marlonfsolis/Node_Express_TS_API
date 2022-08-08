import sql from "mssql";

import {IResult} from "../shared/Result";
import {Err} from "../shared/Err";
import * as db from "../shared/database";


/**
 * Save a permission object
 */
export const getPermissions = async (): Promise<IResult> => {
    try {
        const pool = await db.getDbConnection();
        const result = await pool.query("select * from Permission");
        console.dir(result);

    } catch (err) {
        console.log(err);
    }


    return {} as IResult;
}
