// src/entities/User.ts

import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import { PaymentMethod } from "./PaymentMethod";
import { UserRole } from "../model/User";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn("uuid")
    id?: string = undefined!;

    @Column({ unique: true, length: 30 })
    username!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ name: "first_name" })
    firstName!: string;

    @Column({ name: "last_name" })
    lastName!: string;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.User
    })
    role!: UserRole

    @Column({ name: "last_login", nullable: true })
    lastLogin?: Date;

    @Column({ default: false })
    isActive!: boolean;

    @Column({ name: "two_factor_secret", nullable: true })
    twoFactorSecret?: string;

    @Column({ name: "password_reset_token", nullable: true })
    passwordResetToken?: string;

    @Column({ name: "password_reset_expires", nullable: true })
    passwordResetExpires?: Date;

    @Column({ name: "failed_login_attempts", default: 0 })
    failedLoginAttempts!: number;

    @Column({ name: "lock_until", nullable: true })
    lockUntil?: Date;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;

    @OneToMany(() => PaymentMethod, paymentMethod => paymentMethod.user)
    paymentMethods!: PaymentMethod[];
}