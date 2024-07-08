import { inject } from 'inversify';
import { UserRepository } from '../../dataProvider/repositories/userRepository';
import { RegisterUserCommand } from "../commands/RegisterUserCommand";
import { UserRegisteredEvent } from "../events/UserRegisteredEvent";
import { ICommandHandler } from '../shared/ICommandHandler';
import { EventBus } from '../shared/IEventBus';
import { TYPES, provideNamed } from '../../inversify.config';

@provideNamed(TYPES.ICommandHandler, RegisterUserCommandHandler.name)
export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(
    @inject(UserRepository) private userRepository: UserRepository,
    @inject(EventBus) private eventBus: EventBus
  ) {}

  async handle(command: RegisterUserCommand): Promise<UserRegisteredEvent> {

    if (!command.email || !command.password) {
      throw new Error('Email and password are required');
    }

    if (!command.username) {
      throw new Error('The username is required');
    }

    if (await this.userRepository.findByEmail(command.email) || await this.userRepository.findByUsername(command.username)) {
      throw new Error('User already exists');
    }
    
    // If validation passes, return an event
    return new UserRegisteredEvent(command.email, command.username, command.password, command.role);
  }
}