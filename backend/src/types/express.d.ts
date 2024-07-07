// src/types/express.d.ts
import { Session } from 'express-session';

declare module 'express' {
  interface Request {
    session?: Session & Partial<SessionData>; // Extend Request interface with session property
  }
}
