// src/controllers/authMiddlesware.ts

import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = (req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next(); // Move to the next middleware or route handler
};

// Middleware to track user activity and update session
export function trackUserActivity(req: Request, res: Response, next: NextFunction) {
  if (req.session) {
    req.session.isActive = true; // Set isActive to true when session is active
  }

  // Middleware chain continues
  next();
}

// Middleware to handle session closure or inactivity
export function handleSessionClosure(req: Request, res: Response, next: NextFunction) {
  req.session.isActive = false; // Set isActive to false when session is closed or inactive

  // Middleware chain continues
  next();
}