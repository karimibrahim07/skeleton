import { inject } from 'inversify';
import { UserRepository } from '../../dataProvider/repositories/userRepository';
import { GetUserByEmailQuery } from '../queries/GetUserByEmailQuery';
import { User } from '../../dataProvider/entities/User';
import { IQueryHandler } from '../shared/IQueryHandler';
import { provide } from 'inversify-binding-decorators';
import { UserDTO, mapUserToDTO } from '../../dataProvider/dtos/UserDTO';

@provide(GetUserByEmailQueryHandler)
export class GetUserByEmailQueryHandler implements IQueryHandler<GetUserByEmailQuery> {
    constructor(@inject(UserRepository) private userRepository: UserRepository) { }

    async handle(query: GetUserByEmailQuery): Promise<UserDTO[]> {
        const user = await this.userRepository.findByEmail(query.email);
        if (!user) {
            throw new Error('User not found');
        }
        return [mapUserToDTO(user)]
    }
}
