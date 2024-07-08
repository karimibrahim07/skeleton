import { ICommand } from "./ICommand";
import { IEvent } from "./IEvent";

export interface ICommandHandler<TCommand extends ICommand> {
  handle(command: TCommand): Promise<IEvent>;
}
