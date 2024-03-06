/* eslint-disable prettier/prettier */
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('contact')
export class ContactEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName?: string;

    @Column()
    lastName?: string;

    @Column()
    email?: string;

    @Column()
    phoneNumber: number

    @Column()
    message: string;
}
