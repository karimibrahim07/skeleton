// src/app.ts

import 'reflect-metadata';
import express from 'express';
import session from 'express-session';
import { createClient } from 'redis';
import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';
import RedisStore from 'connect-redis';
import dotenv from 'dotenv';
import { InversifyExpressServer } from 'inversify-express-utils';
import container from './dataProvider/inversify.config';
import { initializeDatabase } from './dataProvider/datasource';

// Load environment variables from .env file
dotenv.config();

async function startServer() {
  const app = express();

  // Initialize database
  try {
    await initializeDatabase();
    console.log('Database initialized');
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }

  const redisClient = createClient();
  redisClient.connect().catch(console.error);

  app.use(helmet());
  app.use(express.json());

  app.use(
    session({
      genid: () => uuidv4(),
      store: new RedisStore({ client: redisClient }),
      secret: process.env.SESSION_SECRET!,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.NODE_ENV === 'production', httpOnly: true, maxAge: 1000 * 60 * 60 },
    })
  );

  // Set up InversifyExpressServer
  const server = new InversifyExpressServer(container, null, { rootPath: '/api' }, app);
  const appConfigured = server.build();

  const PORT = process.env.PORT || 3000;
  appConfigured.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

// Start the server
startServer().catch((error) => console.error('Error starting server:', error));
