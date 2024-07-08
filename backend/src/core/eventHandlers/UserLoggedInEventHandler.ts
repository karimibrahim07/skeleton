import { TYPES, provideNamed } from "../../inversify.config";
import { UserLoggedInEvent } from "../events/UserLoggedInEvent";
import { IEventHandler } from '../shared/IEventHandler';

@provideNamed(TYPES.IEventHandler, UserLoggedInEventHandler.name)
export class UserLoggedInEventHandler implements IEventHandler<UserLoggedInEvent> {
  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  async handle(event: UserLoggedInEvent, req?: any): Promise<void> {
    if (req && req.session) {
      req.session.userId = event.userId;
      req.session.userEmail = event.email;
      req.session.userRole = event.role;
      req.session.isActive = true; // Set session active on login
      console.log(req.session)
    }
  }
}
