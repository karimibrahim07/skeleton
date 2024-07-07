import { IEvent } from "./IEvent";


export interface IEventHandler<T extends IEvent> {

  handle(event: T): Promise<void>;
}
