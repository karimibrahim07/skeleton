import { IEvent } from "../shared/IEvent";


export class UserLoggedInEvent implements IEvent {
  type = 'UserLoggedIn';
  constructor(
    public userId: string | undefined, 
    public email: string, 
    public username: string, 
    public role: string, 
  ) { }
}
