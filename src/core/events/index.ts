// src/events/index.ts
export interface IEvent {
    type: string;
  }
  
  export class UserRegisteredEvent implements IEvent {
    type = 'UserRegistered';
    constructor(public email: string, public username: string, public password: string, public role: string) {}
  }
  
  export class UserLoggedInEvent implements IEvent {
    type = 'UserLoggedIn';
    constructor(public userId: string | undefined, public email: string, public username: string, public role: string) {}
  }