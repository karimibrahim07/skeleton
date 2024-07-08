import express from "express";

export const extendSessionMiddleware = (req: express.Request, res: express.Response, next: express.NextFunction) => {
  if (req.session) {
    req.session.cookie.maxAge = 1000 * 60 * 60; // Extend session max age to 1 hour (3600000 ms)
  }
  next();
};