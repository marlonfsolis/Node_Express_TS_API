import {IErr} from "./Err";

export interface IResult<T> {
    success: boolean;
    data: T;
    err?: IErr;
    [key: string]: any;
}
