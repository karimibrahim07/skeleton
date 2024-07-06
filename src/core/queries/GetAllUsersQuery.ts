import { IQuery } from "../shared/IQuery";


export class GetAllUsersQuery implements IQuery {
    type = 'GetAllUsers';
    constructor() { }
}
