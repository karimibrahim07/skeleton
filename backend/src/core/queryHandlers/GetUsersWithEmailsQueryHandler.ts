// src/queryHandlers/GetUsersWithEmailsQueryHandler.ts

import { inject } from 'inversify';
import { UserRepository } from '../../dataProvider/repositories/userRepository';
import { IQueryHandler } from '../shared/IQueryHandler';
import { provide } from 'inversify-binding-decorators';
import { GetUsersWithEmailsQuery } from '../queries/GetUsersWithEmailsQuery';
import { UserDTO, mapUsersToDTO } from '../../dataProvider/dtos/UserDTO';

@provide(GetUsersWithEmailsQueryHandler)
export class GetUsersWithEmailsQueryHandler implements IQueryHandler<GetUsersWithEmailsQuery> {
    constructor(
        @inject(UserRepository) private userRepository: UserRepository,
    ) { }

    async handle(query: GetUsersWithEmailsQuery): Promise<UserDTO[]> {
        const users = await this.userRepository.findAll();
        return mapUsersToDTO(users)
    }
}
