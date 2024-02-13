/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/ban-types */
import { IsArray, IsBoolean, IsObject, IsString } from 'class-validator';

export class LoginUserDto {
  @IsBoolean()
  isError: boolean;

  @IsString()
  message: String;

  @IsString()
  data: object;
}
