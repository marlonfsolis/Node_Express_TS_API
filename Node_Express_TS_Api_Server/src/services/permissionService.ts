import {IResult, ResultError} from "../shared/Result";
import {IPermission} from "../models/Permission";
import * as permRepo from "../repositorys/permissionRepository";
import {Err, IErr} from "../shared/Err";


/**
 * Save a permission object
 */
export const getPermissions = async (): Promise<IResult<IPermission[]>> => {
    try {

        return await permRepo.getPermissions();

    } catch (err) {
        console.log(err);
        return new ResultError(
            new Err(
                `Error - Something bad happen. ${JSON.stringify(err)}`,
                `permissionService.getPermissions`
            )
        );
    }
}
