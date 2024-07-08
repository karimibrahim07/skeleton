import { inject, Container } from "inversify";
import { IEventHandler } from "./IEventHandler";
import { IEvent } from "./IEvent";
import { ICommand } from "./ICommand";
import { ICommandHandler } from './ICommandHandler';
import { provide } from "inversify-binding-decorators";
import { TYPES } from "../../inversify.config";

@provide(EventBus)
export class EventBus {
    constructor(@inject(Container) private container: Container) { }

    async sendCommand(command: ICommand): Promise<void> {
        const commandHandler: ICommandHandler<ICommand> = this.container.getNamed(TYPES.ICommandHandler, `${command.constructor.name}Handler`);
        const event = await commandHandler.handle(command)
        
        const eventHandler: IEventHandler<IEvent> = this.container.getNamed(TYPES.IEventHandler, `${event.constructor.name}Handler`)
        eventHandler.handle(event);
    }
}
