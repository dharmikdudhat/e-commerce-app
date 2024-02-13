/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

@Entity()
export class User {

    @PrimaryGeneratedColumn("uuid")
    id: number;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    age: number;

    @Column()
    role: string;

    @Column()
    password: string;

}


//Working on different backend technologies starting from Javascript Backend portion to TypeScript and then moving forward to Nodejs and further with its frameworks like Nestjs.Also work on different databases like SQL(MySql , Postgres) and NoSQl(MongoDb , FireBase).Working on Different projects using these all technologies.
//Backend Part-Javascript , NodeJS with it's frameworks and Databases