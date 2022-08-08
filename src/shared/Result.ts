import {IErr} from "./Err";

export interface IResult {
    success: boolean;
    status?: number;
    err?: IErr;
    [key: string]: any;
}
