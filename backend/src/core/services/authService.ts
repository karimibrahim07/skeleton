// src/services/AuthService.ts
import { LoginUserCommand } from "../commands/LoginUserCommand";
import { RegisterUserCommand } from "../commands/RegisterUserCommand";
import { provide } from "inversify-binding-decorators";
import { EventBus } from "../shared/IEventBus";
import { inject } from "inversify";

@provide(AuthService)
export class AuthService {
  constructor(
    @inject(EventBus) private eventBus: EventBus
  ) {}

  async registerUser(email: string, username: string, password: string, role: string): Promise<void> {
    const command = new RegisterUserCommand(email, username, password, role);
    await this.eventBus.sendCommand(command);
  }

  async loginUser(email: string, password: string, req: any): Promise<void> {
    const command = new LoginUserCommand(email, password);
    const event = await this.loginCommandHandler.handle(command);
    await this.userLoggedInEventHandler.handle(event, req);
  }
}