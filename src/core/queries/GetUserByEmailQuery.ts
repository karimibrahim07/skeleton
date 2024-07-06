import { IQuery } from "../shared/IQuery";


export class GetUserByEmailQuery implements IQuery {
    type = 'GetUserByEmail';
    constructor(public email: string) { }
}
