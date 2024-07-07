import { UserRepository } from '../../dataProvider/repositories/userRepository';
import { LoginUserCommand } from "../commands/LoginUserCommand";
import { UserLoggedInEvent } from "../events/UserLoggedInEvent";
import { compare } from 'bcrypt';
import { ICommandHandler } from '../shared/ICommandHandler';
import { provide } from 'inversify-binding-decorators';

@provide(LoginUserCommandHandler)
export class LoginUserCommandHandler implements ICommandHandler<LoginUserCommand> {
  constructor(private userRepository: UserRepository) { }

  async handle(command: LoginUserCommand): Promise<UserLoggedInEvent> {
    // Find the user by email
    const user = await this.userRepository.findByEmail(command.email);
    if (!user) {
      throw new Error('Invalid credentials');
    }

    // Use bcrypt to compare passwords
    const isPasswordValid = await compare(command.password, user.password);
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // If validation passes, return an event
    return new UserLoggedInEvent(user.id, user.email, user.username, user.role);
  }
}
