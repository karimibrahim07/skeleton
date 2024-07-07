import { ICommand } from "../shared/ICommand";


export class LoginUserCommand implements ICommand {
  type = 'LoginUser';
  constructor(
    public email: string, 
    public password: string,   
  ) { }
}
