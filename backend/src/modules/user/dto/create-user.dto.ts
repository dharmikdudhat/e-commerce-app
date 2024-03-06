/* eslint-disable prettier/prettier */
import { IsString, IsEmail, IsInt, IsOptional } from 'class-validator';

export class CreateUserDto {
  @IsString()
  username: string;

  @IsEmail()
  email: string;

  @IsInt()
  age: number;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  password: string;

  @IsString()
  personalAnswer: string;

  @IsString()
  @IsOptional()
  imagePath?: string;
}
