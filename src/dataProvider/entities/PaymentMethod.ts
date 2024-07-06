// src/entities/PaymentMethod.ts

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { User } from "./User";

@Entity("payment_methods")
export class PaymentMethod {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ name: "card_token" })
    cardToken!: string;

    @Column({ name: "last_four_digits" })
    lastFourDigits!: string;

    @Column()
    brand!: string;

    @Column({ name: "expiry_month" })
    expiryMonth!: number;

    @Column({ name: "expiry_year" })
    expiryYear!: number;

    @ManyToOne(() => User, user => user.paymentMethods)
    user!: User;

    @CreateDateColumn({ name: "created_at" })
    createdAt!: Date;

    @UpdateDateColumn({ name: "updated_at" })
    updatedAt!: Date;
}