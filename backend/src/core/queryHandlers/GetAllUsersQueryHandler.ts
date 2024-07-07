import { inject } from 'inversify';
import { UserRepository } from '../../dataProvider/repositories/userRepository';
import { GetAllUsersQuery } from '../queries/GetAllUsersQuery';
import { IQueryHandler } from '../shared/IQueryHandler';
import { provide } from 'inversify-binding-decorators';
import { UserDTO, mapUsersToDTO } from '../../dataProvider/dtos/UserDTO';

@provide(GetAllUsersQueryHandler)
export class GetAllUsersQueryHandler implements IQueryHandler<GetAllUsersQuery> {
    constructor(@inject(UserRepository) private userRepository: UserRepository) { }

    async handle(query: GetAllUsersQuery): Promise<UserDTO[]> {
        const users = await this.userRepository.findAll();
        return mapUsersToDTO(users)
    }
}
