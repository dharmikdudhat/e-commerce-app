/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactEntity } from './entities/contact.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ContactService {

  constructor(@InjectRepository(ContactEntity) private contactRepository: Repository<ContactEntity>) { }

  async create(createContactDto: CreateContactDto): Promise<ContactEntity> {

    try {
      const contact = new ContactEntity()
      contact.firstName = createContactDto.firstName;
      contact.lastName = createContactDto.lastName;
      contact.email = createContactDto.email;
      contact.message = createContactDto.message;
      contact.phoneNumber = createContactDto.phoneNumber;
      return await this.contactRepository.save(contact);
    } catch (error) {
      console.log(error)
      throw new BadRequestException("Please  check your data and try again")
    }
  }

  async findAll(): Promise<ContactEntity[]> {
    return await this.contactRepository.find();
  }

}
