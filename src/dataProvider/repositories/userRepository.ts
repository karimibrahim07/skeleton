// src/repositories/UserRepository.ts

import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { AppDataSource } from '../../dataProvider/datasource';
import { provide } from 'inversify-binding-decorators';

@provide(UserRepository)
export class UserRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = AppDataSource.createEntityManager().getRepository(User);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.repository.findOneBy({ id }); // Corrected to findOne
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.repository.findOne({ where: { username } });
  }

  async findAll(){
    return this.repository.find()
  }

  async createAndSave(user: User): Promise<User> {
    const newUser = this.repository.create(user);
    return this.repository.save(newUser);
  }
}
