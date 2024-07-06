// src/controllers/AuthController.ts

import { Request, Response } from 'express';
import { controller, httpPost } from 'inversify-express-utils';
import { AuthService } from '../../core/services/authService';

@controller('/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @httpPost('/register')
  async registerUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, username, password, role } = req.body;
      await this.authService.registerUser(email, username, password, role);
      res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  @httpPost('/login')
  async loginUser(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const token = await this.authService.loginUser(email, password);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }
}
