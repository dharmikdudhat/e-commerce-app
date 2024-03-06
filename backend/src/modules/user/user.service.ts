/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  ConflictException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../../Entities/user.entity';
import { IsUppercase, validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { MailerService } from 'src/mailer/mailer.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<any>,
    private readonly emailService: MailerService,
  ) {}

  async uploadFile(createUserDto: CreateUserDto) {
    try {
      const isUserExist = await this.findOneUser(createUserDto.email);

      console.log(isUserExist);
      if (isUserExist) {
        throw new ConflictException('User Already exists');
      }

      const saltOrRounds = await bcrypt.genSalt();
      const hashPassword = await bcrypt.hash(
        createUserDto.password,
        saltOrRounds,
      );
      const lowerCasedEmail = createUserDto.email.toLowerCase();

      console.log('lowercaseemail', lowerCasedEmail);
      const user: User = new User();

      user.username = createUserDto.username;
      user.email = lowerCasedEmail;
      user.age = createUserDto.age;
      user.role = createUserDto.role || 'USER';
      user.personalAnswer = createUserDto.personalAnswer;
      user.createdAt = new Date().toString();
      user.updatedAt = new Date().toString();
      user.password = hashPassword;
      this.userRepository.save(user);

      await this.emailService.sendRegistrationSuccessfulEmail(lowerCasedEmail);
      return { message: 'Successfully Registered', data: null };
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
    return this.userRepository.findOneBy({ email });
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
