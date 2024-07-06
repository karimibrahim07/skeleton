// src/services/AuthService.ts
import { RegisterUserCommand, LoginUserCommand } from '../commands';
import { RegisterUserCommandHandler, LoginUserCommandHandler } from '../commandHandlers';
import { UserRegisteredEventHandler, UserLoggedInEventHandler } from '../eventHandlers';
import { UserRepository } from '../../dataProvider/repositories/userRepository';
import { injectable } from 'inversify';
import { User } from '../../dataProvider/entities/User';
import { AppDataSource } from '../../dataProvider/datasource';

@injectable()
export class AuthService {
  private userRepository: UserRepository;
  private registerCommandHandler: RegisterUserCommandHandler;
  private   loginCommandHandler: LoginUserCommandHandler;
  private userRegisteredEventHandler: UserRegisteredEventHandler;
  private userLoggedInEventHandler: UserLoggedInEventHandler;

  constructor() {
    this.userRepository = new UserRepository();
    this.registerCommandHandler = new RegisterUserCommandHandler(this.userRepository);
    this.loginCommandHandler = new LoginUserCommandHandler(this.userRepository);
    this.userRegisteredEventHandler = new UserRegisteredEventHandler(this.userRepository);
    this.userLoggedInEventHandler = new UserLoggedInEventHandler();
  }

  async registerUser(email: string, username: string, password: string, role: string): Promise<void> {
    const command = new RegisterUserCommand(email, username, password, role);
    const event = await this.registerCommandHandler.handle(command);
    await this.userRegisteredEventHandler.handle(event);
  }

  async loginUser(email: string, password: string): Promise<void> {
    const command = new LoginUserCommand(email, password);
    const event = await this.loginCommandHandler.handle(command);
    await this.userLoggedInEventHandler.handle(event);
  }
}