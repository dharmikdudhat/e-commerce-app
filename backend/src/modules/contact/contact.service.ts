/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactEntity } from '../../Entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StringifyOptions } from 'querystring';

export class ContactRes {
  message: string;
  data: null;
}
@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private contactRepository: Repository<ContactEntity>,
  ) {}

  async create(createContactDto: CreateContactDto): Promise<ContactRes> {
    try {
      const contact = new ContactEntity();
      contact.firstName = createContactDto.firstName;
      contact.lastName = createContactDto.lastName;
      contact.email = createContactDto.email;
      contact.message = createContactDto.message;
      contact.phoneNumber = createContactDto.phoneNumber;
      await this.contactRepository.save(contact);
      return { message: 'Query Send Successfully', data: null };
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Please  check your data and try again');
    }
  }

  async findAll(): Promise<ContactEntity[]> {
    return await this.contactRepository.find();
  }
}
