// src/controllers/AuthController.ts

import { Request, Response } from 'express';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { AuthService } from '../../core/services/authService';
import { inject } from 'inversify';

@controller('/auth')
export class AuthController {
  constructor(@inject(AuthService) private authService: AuthService) {}

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
      const token = await this.authService.loginUser(email, password, req);
      res.json({ token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  @httpGet('/logout')
  async logoutUser(req: Request, res: Response): Promise<void> {
    try {
      // Destroy the session
      req.session.destroy((err: any) => {
        if (err) {
          throw new Error('Failed to logout');
        }
        res.clearCookie('sid'); // Clear the session cookie
        res.json({ message: 'Logout successful' });
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}
