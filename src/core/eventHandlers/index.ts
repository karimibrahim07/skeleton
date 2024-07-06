// src/eventHandlers/index.ts
import { inject } from 'inversify';
import { UserRole } from '../../dataProvider/model/User';
import { UserRepository } from '../../dataProvider/repositories/userRepository';
import { UserRegisteredEvent, UserLoggedInEvent, IEvent } from '../events';
import bcrypt from 'bcrypt';
import moment from 'moment';

export interface IEventHandler<T extends IEvent> {

  handle(event: T): Promise<void>;
}

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

export class UserLoggedInEventHandler implements IEventHandler<UserLoggedInEvent> {
  async handle(event: UserLoggedInEvent, req?: Request): Promise<void> {
    if (req && req.session) {
      req.session.userId = event.userId;
      req.session.userEmail = event.email;
      req.session.userRole = event.role;
      req.session.isActive = true; // Set session active on login
    }
  }
}