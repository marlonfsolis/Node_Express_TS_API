import {Request, Response} from "express";
import {ReasonPhrases,StatusCodes} from "http-status-codes";

import * as perServ from "../services/permissionService";
import {IResponse} from "../shared/Response";
import {IPermission} from "../models/Permission";


export const getPermissions = async (req:Request, res:Response) => {
    const result = await perServ.getPermissions();
    if (!result.success) {
        return res
            .status(StatusCodes.INTERNAL_SERVER_ERROR)
            .send({
                statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
                msg: ReasonPhrases.INTERNAL_SERVER_ERROR,
                err: result.err
            } as IResponse<IPermission[]>);
    }

    const permissions = result.data;
    return res.status(StatusCodes.OK).send({
        statusCode: StatusCodes.OK,
        msg: ReasonPhrases.OK,
        data: permissions
    } as IResponse<IPermission[]>);
};

export const createPermission = (req: Request, res: Response) => {
    res.status(200).send({
       error: "",
       data: {
           message: "Permission created!"
       }
    });
};

