import db from "../shared/Database";
import {IPermission} from "../models/Permission";
import {IRecordSet} from "mssql";


/**
 * Save a permission object
 */
export const getPermissions = async (): Promise<IPermission[]> => {
    let permissions = [] as IPermission[];
    try {
        const pool = await db.getDbConnection();
        const result = await pool.query("select * from Permission");
        const permissionRecordSet = result.recordset as IRecordSet<IPermission>;
        permissions = permissionRecordSet as IPermission[];
    } catch (err) {
        console.log(err);
    }


    return permissions;
}
