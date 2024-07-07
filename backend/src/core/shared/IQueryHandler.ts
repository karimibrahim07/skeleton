import { IQuery } from './IQuery';


export interface IQueryHandler<T extends IQuery> {
    handle(query: T): Promise<any>; // You can replace `any` with a more specific type if you prefer
}
