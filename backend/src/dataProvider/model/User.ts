// src/interfaces/IUserRepository.ts

import { User } from "../entities/User";
import { PaymentMethod } from "../entities/PaymentMethod";

export enum UserRole {
  User = "user",
  Admin = "admin",
  Manager = "manager"
}

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  create(user: Partial<User>): Promise<User>;
  update(id: string, user: Partial<User>): Promise<User>;
  delete(id: string): Promise<void>;
  addPaymentMethod(userId: string, paymentMethod: Partial<PaymentMethod>): Promise<PaymentMethod>;
  findPaymentMethods(userId: string): Promise<PaymentMethod[]>;
}