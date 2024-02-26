/* eslint-disable prettier/prettier */
import {  Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class ProductEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column()
    imagePath: string;

    @Column(/* { type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' } */)
    createdAt?: string;

    @Column(/* { type: 'timestamp', default: () => `CURRENT_TIMESTAMP`, onUpdate: `CURRENT_TIMESTAMP` } */)
    updatedAt?: string;

    @Column({ nullable: true })
    deletedAt?: string;

    /* @BeforeInsert()
    updateTimestampsOnInsert() {
        this.createdAt = new Date();
        this.updatedAt = new Date();
    }

    @BeforeUpdate()
    updateTimestamp() {
        this.updatedAt = new Date();
    } */
}
