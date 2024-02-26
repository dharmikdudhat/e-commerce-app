/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { validate } from 'class-validator';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<any>,
  ) { }

  uploadFile(file: Express.Multer.File, createUserDto: CreateUserDto) {
    try {
      const user: User = new User();
      user.username = createUserDto.username;
      user.email = createUserDto.email;
      user.age = createUserDto.age;
      user.role = createUserDto.role || 'USER';
      user.password = createUserDto.password;
      user.imagePath = " file.path";
      user.createdAt = new Date().toString();
      user.updatedAt = new Date().toString();
      console.log(user)
      return this.userRepository.save(user);
    } catch (error) {
      console.log('Error in Product:', error);
      throw new BadRequestException("Can't upload the file");
    }
  }
  // create(createUserDto: CreateUserDto): Promise<User> {
  //   try {
  //     let user: User = new User();
  //     user.username = createUserDto.username;
  //     user.email = createUserDto.email;
  //     user.age = createUserDto.age;
  //     user.role = createUserDto.role || 'USER';
  //     user.password = createUserDto.password;
  //     user.createdAt = new Date().toString();
  //     user.updatedAt = new Date().toString();
  //     console.log(user)
  //     return this.userRepository.save(user);
  //   } catch (error) {
  //     console.log('Error:', error);
  //   }
  // }

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

  update(id: number, updateUserDto: UpdateUserDto) {
    // eslint-disable-next-line prefer-const
    let user: User = new User();
    user.username = UpdateUserDto.username;
    user.email = UpdateUserDto.email;
    user.age = UpdateUserDto.age;
    user.id = id;
    user.password = UpdateUserDto.password;

    return this.userRepository.save(user);
  }

  remove(id: number) {
    return this.userRepository.delete(id);
  }
}
