// src/commands/index.ts
export interface ICommand {
    type: string;
  }
  
  export class RegisterUserCommand implements ICommand {
    type = 'RegisterUser';
    constructor(public email: string, public username: string, public password: string, public role: string) {}
  }
  
  export class LoginUserCommand implements ICommand {
    type = 'LoginUser';
    constructor(public email: string, public password: string) {}
  }