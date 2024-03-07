/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
  Redirect,
  Res,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../Entities/user.entity';
import { IsUppercase, validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { MailerService } from 'src/mailer/mailer.service';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
// import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<any>,
    private readonly emailService: MailerService,
    private readonly jwtService: JwtService,
    // private readonly authService: AuthService,
  ) {}

  async uploadFile(createUserDto: CreateUserDto) {
    try {
      const isUserExist = await this.findOneUser(createUserDto.email);

      if (isUserExist) {
        throw new ConflictException('User Already exists');
      }

      const saltOrRounds = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );
      const lowerCasedEmail = createUserDto.email.toLowerCase();

      const user: User = new User();

      user.username = createUserDto.username;
      user.email = lowerCasedEmail;
      user.age = createUserDto.age;
      user.role = createUserDto.role || 'USER';
      user.personalAnswer = createUserDto.personalAnswer;
      user.createdAt = new Date().toString();
      user.updatedAt = new Date().toString();
      user.password = hashPassword;

      await this.userRepository.save(user);
      // Retrieve user details after signing in
      const signedInUserResponse = await this.signInUser(
        lowerCasedEmail,
        createUserDto.password,
      );

      return {
        message: 'Successfully Registered and Logged In',
        data: signedInUserResponse.data,
      };
    } catch (error) {
      console.log('Error in Product:', error);
      throw new BadRequestException("Can't send the details");
    }
  }

  async validateUser(createUserDto: CreateUserDto): Promise<string[]> {
    const errors = await validate(createUserDto);
    return errors.map((error) => Object.values(error.constraints)).flat();
  }

  async signInUser(email, password) {
    try {
      const user = await this.findOneUser(email);
      if (!user) throw new UnauthorizedException('Invalid Credentials');
      // const isMatch = await this.authService.signIn(email, password);
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        throw new UnauthorizedException('Invalid credentials');
      }

      const payload = {
        email: email,
        id: user.id,
      };
      const token = await this.jwtService.signAsync(payload);

      const userResponse = {
        email: user.email,
        username: user.username,
        role: user.role,
        id: user.id,
        age: user.age,
        personalAnswer: user.personalAnswer,
        token,
      };

      return {
        message: 'Login Successful',
        data: { user: userResponse },
      };
    } catch (error) {
      // Log the error for debugging purposes
      console.error('Error during sign-in:', error);

      throw new UnauthorizedException(
        'Authentication failed. Please try again later.',
      );
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    // eslint-disable-next-line prefer-const
    try {
      let user: User = new User();
      user.username = updateUserDto.username;
      user.email = updateUserDto.email;
      user.age = updateUserDto.age;
      user.id = id;
      user.personalAnswer = updateUserDto.personalAnswer;
      user.password = updateUserDto.password;
      this.userRepository.save(user);
      return { message: 'User Updated', data: null };
    } catch (error) {
      console.log(error);
      throw new BadRequestException("User can't updated");
    }
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneUser(email: string) {
    const user = this.userRepository.findOneBy({ email });
    return user;
  }

  // Update the user with the reset token
  async saveResetToken(id, resetToken) {
    try {
      return await this.userRepository
        .createQueryBuilder()
        .update(User)
        .set({ resetToken: `${resetToken}` })
        .where('id = :id', { id: id })
        .execute();
    } catch (error) {
      console.log('Error in saving reset token:', error);
      throw new Error('Error in saving reset token');
    }
  }

  // Send Reset Password Mail
  async sendResetPasswordEmail(email: string) {
    const user = await this.findOneUser(email);
    try {
      if (user) {
        const date = new Date().toString();
        const resetToken = Date.parse(date).toString();
        console.log('the token in reset passsword email:', resetToken);
        await this.saveResetToken(user.id, resetToken);
        await this.emailService.sendResetPasswordEmail(email, resetToken);
        return { message: 'Mail sent successfully', data: null };
      } else {
        throw new BadRequestException("User Dosen't Exist!");
      }
    } catch (error) {
      console.log('Error in sending reset password email:', error);
      throw new Error('Error in sending reset password email');
    }
  }

  // Verify user and send Reset Password Page
  async resetPassword(token: string, password: string) {
    console.log('The token: ', token);
    try {
      const user = await this.userRepository.findOneBy({ resetToken: token });
      const salt = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(password, salt);
      if (user) {
        await this.userRepository
          .createQueryBuilder()
          .update(User)
          .set({
            password: `${hashPassword}`,
            updatedAt: new Date().toString(),
          })
          .where('resetToken = :token', { token: token })
          .execute();
        return { message: 'User Verified and Password Updated', data: null };
      } else {
        return new BadRequestException('Invalid Token');
      }
    } catch (error) {
      console.log('Error in reset password:', error);
      throw new Error('Error in reset password');
    }
  }
}
