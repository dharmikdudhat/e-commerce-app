/* eslint-disable prettier/prettier */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../user/entities/user.entity"

@Entity()
export class ProductEntity {

    @PrimaryGeneratedColumn("uuid")
    productId: string

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    price: number;

    @Column()
    quantity: number;

    @Column({ type: 'bytea' })
    data: string

    // Relationships
    @Column({ nullable: true })
    userId?: string;

    @ManyToOne(() => User, (user) => user.products)
    user?: User;


}
