import {Request, Response} from "express";

export const getPermissions = (req:Request, res:Response) => {
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

