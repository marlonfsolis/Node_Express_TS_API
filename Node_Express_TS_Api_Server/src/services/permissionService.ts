import {IResult} from "../shared/Result";
import {IPermission} from "../models/Permission";
import * as permRepo from "../repositorys/permissionRepository";
import {Err, IErr} from "../shared/Err";


/**
 * Save a permission object
 */
export const getPermissions = async (): Promise<IResult<IPermission[]>> => {
    try {
        const permissions = await permRepo.getPermissions();
        return {
            success: true,
            data: permissions
        } as IResult<IPermission[]>;

    } catch (err) {
        console.log(err);
        return {
            success: false,
            data: [],
            err: {
                msg: "Error - Something bad happen. - " + JSON.stringify(err),
                location: "permissionService.getPermissions"
            } as IErr
        } as IResult<IPermission[]>;
    }
}
