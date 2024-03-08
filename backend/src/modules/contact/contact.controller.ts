/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ContactService } from './contact.service';
import { CreateContactDto } from './dto/create-contact.dto';
import { ContactEntity } from '../../Entities/contact.entity';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post('add')
  async create(
    @Body() createContactDto: CreateContactDto,
  ): Promise<any> {
    return this.contactService.create(createContactDto);
  }

  @Get('getall')
  async findAll(): Promise<ContactEntity[]> {
    return this.contactService.findAll();
  }
}
