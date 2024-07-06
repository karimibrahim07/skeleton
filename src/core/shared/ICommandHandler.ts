import { ICommand } from "./ICommand";
import { IEvent } from "./IEvent";


export interface ICommandHandler<T extends ICommand> {
  handle(command: T): Promise<IEvent>;
}
