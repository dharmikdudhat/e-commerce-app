/* eslint-disable prettier/prettier */
import { IsNumber, IsString } from 'class-validator';
export class CreateContactDto {

    @IsString()
    firstName?: string;

    @IsString()
    lastName?: string;

    @IsString()
    email?: string;

    @IsNumber()
    phoneNumber: number

    @IsString()
    message: string;
}
