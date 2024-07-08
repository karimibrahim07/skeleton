import { fluentProvide, provide } from "inversify-binding-decorators";
import { ICommand } from "../shared/ICommand";

@provide(RegisterUserCommand)
export class RegisterUserCommand implements ICommand {
  type = 'RegisterUser';
  constructor(
    public email: string, 
    public username: string, 
    public password: string, 
    public role: string) { }
}
