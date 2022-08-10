import {Request, Response} from "express";

import * as perServ from "../services/permissionService";
import {HttpResponseInternalServerError, HttpResponseOk} from "../shared/HttpResponse";


export const getPermissions = async (req:Request, res:Response) => {
    const result = await perServ.getPermissions();
    if (!result.success) {
        return new HttpResponseInternalServerError(res, [result.err!]);

        // return res
        //     .status(StatusCodes.INTERNAL_SERVER_ERROR)
        //     .send({
        //         statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        //         msg: ReasonPhrases.INTERNAL_SERVER_ERROR,
        //         err: result.err
        //     } as IResponse<IPermission[]>);
    }

    const permissions = result.data;
    return new HttpResponseOk(res, permissions);

    // return res.status(StatusCodes.OK).send({
    //     statusCode: StatusCodes.OK,
    //     msg: ReasonPhrases.OK,
    //     data: permissions
    // } as IResponse<IPermission[]>);
};

export const createPermission = (req: Request, res: Response) => {
    res.status(200).send({
       error: "",
       data: {
           message: "Permission created!"
       }
    });
};

