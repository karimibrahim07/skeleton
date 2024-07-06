// src/controllers/UserController.ts

import { Request, Response } from 'express';
import { controller, httpGet } from 'inversify-express-utils';
import { UserService } from '../../core/services/userService';
import { inject } from 'inversify';

@controller('/users')
export class UserController {
  constructor(@inject(UserService) private userService: UserService) {}

  @httpGet('/')
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await this.userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  @httpGet('/emails')
  async getUsersByEmail(req: Request, res: Response): Promise<void> {
    try {
        console.log("yeet")
      const user = await this.userService.getUsersByEmail();
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  @httpGet('/:email')
  async getUserByEmail(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.params;
      const user = await this.userService.getUserByEmail(email);
      res.json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}
