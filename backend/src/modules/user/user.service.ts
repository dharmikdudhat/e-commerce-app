/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
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
// import { AuthService } from '../auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<any>,
    private readonly emailService: MailerService,
    private readonly jwtService: JwtService,
    // private readonly authService: AuthService,
  ) { }

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
  
      const loginUserNumber = await this.signInUser(
        lowerCasedEmail,
        createUserDto.password,
      );
  
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

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOneUser(email: string) {
    const user = this.userRepository.findOneBy({ email });
    return user;
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
        password: password,
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
}
