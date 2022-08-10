/**
 * Error response interface
 */
export interface IErr {
    msg: string;
    param: string;
    value: any;
    location: string;
}

/**
 * Error response class. Is used to create error information to be send to the client.
 * @property {string} msg - Message error
 * @property {string} param - Parameter or path that is not valid or error out.
 * @property {string|number} value - Current value of the parameter or path.
 * @property {string} location - Location where the parameter or path is located (body, query string, etc.).
 */
export class Err implements IErr {
    msg: string;
    param: string;
    value: any;
    location: string;

    constructor(msg: string = '', param: string = '', value: any = '', location: string = '') {
        this.msg = msg;
        this.param = param;
        this.value = value;
        this.location = location;
    }

}
