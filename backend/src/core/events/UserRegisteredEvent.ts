import { IEvent } from "../shared/IEvent";


export class UserRegisteredEvent implements IEvent {
  type = 'UserRegistered';
  constructor(public email: string, public username: string, public password: string, public role: string) { }
}
