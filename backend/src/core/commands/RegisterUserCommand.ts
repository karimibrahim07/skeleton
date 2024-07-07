import { ICommand } from "../shared/ICommand";


export class RegisterUserCommand implements ICommand {
  type = 'RegisterUser';
  constructor(
    public email: string, 
    public username: string, 
    public password: string, 
    public role: string) { }
}
