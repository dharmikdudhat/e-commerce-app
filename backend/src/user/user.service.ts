/* eslint-disable prettier/prettier */
/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UserService {

  constructor(@InjectRepository(User) private readonly userRepository: Repository<any>) { }
  create(createUserDto: CreateUserDto): Promise<User> {
    let user: User = new User();
    user.username = createUserDto.username;
    user.email = createUserDto.email;
    user.age = createUserDto.age;
    user.role = createUserDto.role || 'USER';
    user.password = createUserDto.password;
    return this.userRepository.save(user);

    // const user = this.userRepository.create(createUserDto)
    // return this.userRepository.save(user);
  }

  findAll():Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string) {
    return this.userRepository.findOneBy({id : parseInt(id)}) ;
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
