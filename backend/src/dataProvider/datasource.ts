// src/data-source.ts

import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { PaymentMethod } from "./entities/PaymentMethod";
import dotenv from 'dotenv';

//How to run migration
// npm run typeorm migration:run -- -d ./src/dataProvider/datasource.ts
// npm run typeorm migration:generate ./src/dataProvider/migrations/ -- -d ./src/dataProvider/datasource.ts

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false, // Set to false to use migrations
    logging: ['error', 'warn', 'schema'],
    entities: [User, PaymentMethod],
    migrations: [__dirname + '/migrations/**/*.{ts,js}'],
    subscribers: [],
    ssl: process.env.NODE_ENV === "production",
});

export async function initializeDatabase(): Promise<void> {
    AppDataSource.initialize().then(() => {
        console.log("Data Source has been initialized!");
    }).catch((err) => {
        console.error("Error during Data Source initialization", err);
    });
}
