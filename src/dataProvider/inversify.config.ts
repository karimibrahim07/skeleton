// src/inversify.config.ts

import { Container } from 'inversify';
import { UserRepository } from './repositories/userRepository';
import { AuthService } from '../core/services/authService';
import { AuthController } from '../webapp/controllers/authController';

const container = new Container();

// Bind services, repositories, controllers, etc. to the container
container.bind<UserRepository>(UserRepository).to(UserRepository);
container.bind<AuthService>(AuthService).to(AuthService);
container.bind<AuthController>(AuthController).to(AuthController);

export default container;
