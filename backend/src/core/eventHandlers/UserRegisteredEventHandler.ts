// src/eventHandlers/index.ts
import { inject } from 'inversify';
import { UserRole } from '../../dataProvider/model/User';
import { UserRepository } from '../../dataProvider/repositories/userRepository';
import { UserRegisteredEvent } from "../events/UserRegisteredEvent";
import bcrypt from 'bcrypt';
import moment from 'moment';
import { IEventHandler } from '../shared/IEventHandler';
import { provide } from 'inversify-binding-decorators';
import { TYPES, provideNamed } from '../../inversify.config';

@provideNamed(TYPES.IEventHandler, UserRegisteredEventHandler.name)
export class UserRegisteredEventHandler implements IEventHandler<UserRegisteredEvent> {
  constructor(@inject(UserRepository) private userRepository: UserRepository) {}

  async handle(event: UserRegisteredEvent): Promise<void> {
    const hashedPassword = await bcrypt.hash(event.password, 10);
    const role: UserRole = event.role as UserRole; // Cast to enum type

    await this.userRepository.createAndSave({
      email: event.email,
      password: hashedPassword,
      role: role || UserRole.User, // Default to User if role is undefinedz
      username: event.username,
      firstName: '',
      lastName: '',
      isActive: false,
      failedLoginAttempts: 0,
      createdAt: moment().toDate(),
      updatedAt: moment().toDate(),
      paymentMethods: [],
    });
  }
}

