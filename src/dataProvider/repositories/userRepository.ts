// src/repositories/UserRepository.ts
import { Repository } from 'typeorm';
import { User } from '../entities/User';
import { AppDataSource } from '../../dataProvider/datasource';

export class UserRepository extends Repository<User> {
  constructor() {
    super(User, AppDataSource.createEntityManager());
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.findOne({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.findById(id)
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.findOne({ where: { username } });
  }

  async createAndSave(user: User): Promise<User> {
    const newUser = this.create(user);
    return this.save(newUser);
  }
}
