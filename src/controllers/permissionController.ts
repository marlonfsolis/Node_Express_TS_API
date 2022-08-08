import {Request, Response} from "express";

import * as perServ from "../services/permissionService";


export const getPermissions = async (req:Request, res:Response) => {
    const result = await perServ.getPermissions();

    res.status(200).send({
      error: "",
      data: {
          message: "Permission returned!"
      }
  });
};

export const createPermission = (req: Request, res: Response) => {
    res.status(200).send({
       error: "",
       data: {
           message: "Permission created!"
       }
    });
};

