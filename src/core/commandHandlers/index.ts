// src/commandHandlers/index.ts
import { inject, injectable } from 'inversify';
import { UserRepository } from '../../dataProvider/repositories/userRepository';
import { RegisterUserCommand, LoginUserCommand, ICommand } from '../commands';
import { UserRegisteredEvent, UserLoggedInEvent, IEvent } from '../events';

export interface ICommandHandler<T extends ICommand> {
  handle(command: T): Promise<IEvent>;
}

export class RegisterUserCommandHandler implements ICommandHandler<RegisterUserCommand> {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  async handle(command: RegisterUserCommand): Promise<UserRegisteredEvent> {
    // Validation
    if (!command.email || !command.password ) {
      throw new Error('Email and password are required');
    }

    if (!command.username ) {
      throw new Error('The username is required');
    }

    if (await this.userRepository.findByEmail(command.email) || await this.userRepository.findByUsername(command.username)) {
      throw new Error('User already exists');
    }

    // If validation passes, return an event
    return new UserRegisteredEvent(command.email, command.username, command.password, command.role);
  }
}

export class LoginUserCommandHandler implements ICommandHandler<LoginUserCommand> {
  constructor(private userRepository: UserRepository) {}

  async handle(command: LoginUserCommand): Promise<UserLoggedInEvent> {
    // Validation
    const user = await this.userRepository.findByEmail(command.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }
    // Note: In a real application, you'd use bcrypt to compare passwords
    if (user.password !== command.password) {
      throw new Error('Invalid credentials');
    }

    // If validation passes, return an event
    return new UserLoggedInEvent(user.id, user.email, user.username, user.role);
  }
}