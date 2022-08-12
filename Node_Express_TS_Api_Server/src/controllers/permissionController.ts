import {Request, Response} from "express";

import * as perServ from "../services/permissionService";
import {HttpResponseInternalServerError, HttpResponseOk} from "../shared/HttpResponse";


export const getPermissions = async (req:Request, res:Response) => {
    const result = await perServ.getPermissions();
    if (!result.success) {
        return new HttpResponseInternalServerError(res, [result.err!]);
    }

    const permissions = result.data;
    return new HttpResponseOk(res, permissions);
};

export const createPermission = (req: Request, res: Response) => {
    res.status(200).send({
       error: "",
       data: {
           message: "Permission created!"
       }
    });
};

