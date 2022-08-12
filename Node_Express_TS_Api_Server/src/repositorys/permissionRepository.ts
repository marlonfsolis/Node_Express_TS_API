import db from "../shared/Database";
import {IPermission} from "../models/Permission";
import sql, {IRecordSet} from "mssql";

import {IResult, ResultOk, ResultError, Result} from "../shared/Result";
import {Err} from "../shared/Err";
import {IOutInfo} from "../shared/OutInfo";


/**
 * Save a permission object
 */
export const getPermissions = async (): Promise<IResult<IPermission[]>> => {
    let permissions = [] as IPermission[];

    const pool = await db.getDbConnection();
    const r = pool.request();
    r.input("offsetRows", sql.Int(), 0);
    r.input("fetchRows", sql.Int(), 10);
    r.input("filterJson", sql.VarChar(), "{}");
    r.input("searchJson", sql.VarChar(), "{}");
    r.output("outInfo", sql.VarChar());

    const result = await r.execute("sp_Permission_ReadList");
    const outInfo = JSON.parse(result.output.outInfo)[0] as IOutInfo;

    if (!outInfo.success) {
        const err = new Err(
            `Error on DB. ${outInfo.msg}`,
            "permissionRepository.getPermissions",
            `${outInfo.errorLogId}`
        );
        return new ResultError(err);
    }

    const permissionRecordSet = result.recordset as IRecordSet<IPermission>;
    permissions = permissionRecordSet as IPermission[];

    return new ResultOk<IPermission[]>(permissions);
}
