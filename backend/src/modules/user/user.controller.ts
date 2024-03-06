/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  HttpStatus,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SignInDto, LoginResponseDto } from './dto/login.response.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('registration')
  //@Roles(Role.Admin)
  uploadFile(@Body() createUserDto: CreateUserDto) {
    return this.userService.uploadFile(createUserDto);
  }

  // @Post('registration')
  // async create(@Body() createUserDto: CreateUserDto) {
  //   const validationErrors = await this.userService.validateUser(createUserDto);
  //   if (validationErrors.length > 0) {
  //     throw new BadRequestException(validationErrors);
  //   }
  //   return this.userService.create(createUserDto);
  // }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  signIn(@Body() signInDto: SignInDto): Promise<LoginResponseDto> {
    console.log(signInDto);

    return this.userService.signInUser(signInDto.email, signInDto.password);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOneUser(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('forget-password')
  async sendResetPassword(@Body('email') email: string) {
    return this.userService.sendResetPasswordEmail(email);
  }

  @Get('reset-password/:token')
  async resetPassword(@Param('token') token: string): Promise<string> {
    return this.userService.resetPassword(token);
  }
}
