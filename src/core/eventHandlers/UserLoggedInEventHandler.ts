import { UserLoggedInEvent } from "../events/UserLoggedInEvent";
import { IEventHandler } from '../shared/IEventHandler';

export class UserLoggedInEventHandler implements IEventHandler<UserLoggedInEvent> {
  async handle(event: UserLoggedInEvent, req?: any): Promise<void> {
    console.log("HII")
    if (req && req.session) {
      req.session.userId = event.userId;
      req.session.userEmail = event.email;
      req.session.userRole = event.role;
      req.session.isActive = true; // Set session active on login
      console.log(req.session.userId)
      console.log(req.session.userEmail)
      console.log(req.session.userRole)
      console.log(req.session.isActive)
       
    }
  }
}
