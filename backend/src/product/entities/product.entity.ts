/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class ProductEntity {

    @PrimaryGeneratedColumn("uuid")
    productId: string

    @PrimaryGeneratedColumn()
    id: string

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column()
    imagePath: string




}
