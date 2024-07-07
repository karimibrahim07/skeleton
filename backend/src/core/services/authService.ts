// src/services/AuthService.ts
import { LoginUserCommand } from "../commands/LoginUserCommand";
import { RegisterUserCommand } from "../commands/RegisterUserCommand";
import { LoginUserCommandHandler } from '../commandHandlers/LoginUserCommandHandler';
import { RegisterUserCommandHandler } from '../commandHandlers/RegisterUserCommandHandler';
import { UserRegisteredEventHandler } from '../eventHandlers/UserRegisteredEventHandler';
import { UserLoggedInEventHandler } from '../eventHandlers/UserLoggedInEventHandler';
import { UserRepository } from '../../dataProvider/repositories/userRepository';
import { provide } from "inversify-binding-decorators";

@provide(AuthService)
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

  async loginUser(email: string, password: string, req: any): Promise<void> {
    const command = new LoginUserCommand(email, password);
    const event = await this.loginCommandHandler.handle(command);
    await this.userLoggedInEventHandler.handle(event, req);
  }
}