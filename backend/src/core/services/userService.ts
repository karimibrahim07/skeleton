// src/core/services/queryService.ts

import { inject } from 'inversify';
import { GetAllUsersQueryHandler } from '../queryHandlers/GetAllUsersQueryHandler';
import { GetUserByEmailQueryHandler } from '../queryHandlers/GetUserByEmailQueryHandler';
import { GetUserByEmailQuery } from '../queries/GetUserByEmailQuery';
import { GetAllUsersQuery } from '../queries/GetAllUsersQuery';
import { provide } from 'inversify-binding-decorators';
import { GetUsersWithEmailsQueryHandler } from '../queryHandlers/GetUsersWithEmailsQueryHandler';
import { GetUsersWithEmailsQuery } from '../queries/GetUsersWithEmailsQuery';

@provide(UserService)
export class UserService {
  constructor(
    @inject(GetUserByEmailQueryHandler) private getUserByEmailQueryHandler: GetUserByEmailQueryHandler,
    @inject(GetUsersWithEmailsQueryHandler) private getUsersWithEmailsQueryHandler: GetUsersWithEmailsQueryHandler,
    @inject(GetAllUsersQueryHandler) private getAllUsersQueryHandler: GetAllUsersQueryHandler
  ) {}

  async getUserByEmail(email: string) {
    const query = new GetUserByEmailQuery(email);
    return this.getUserByEmailQueryHandler.handle(query);
  }

  async getUsersByEmail() {
    const query = new GetUsersWithEmailsQuery();
    return this.getUsersWithEmailsQueryHandler.handle(query);
  }

  async getAllUsers() {
    const query = new GetAllUsersQuery();
    return this.getAllUsersQueryHandler.handle();
  }
}
