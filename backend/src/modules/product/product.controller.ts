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
  Res,
  UploadedFile,
  StreamableFile,
  Req,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import { extname } from 'path';
import { createReadStream } from 'fs';
import { Roles } from '../../core/RBAC/role.decorator';
import { Role } from '../../core/RBAC/role.enum';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // @Post('add')
  // create( @UploadedFile() files: Express.Multer.File) {
  //   return this.productService.create(createProductDto, files);
  // }

  @Post('upload')
  //@Roles(Role.Admin)
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Destination folder for uploaded files
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productService.uploadFile(file, createProductDto);
  }

  @Get('getAll')
  findAll() {
    return this.productService.findAll();
  }

  @Get(':id')
  findOneByName(@Param('id') id: string) {
    return this.productService.findOneById(id);
  }

  @Get()
  getFile(): StreamableFile {
    const file = createReadStream(path.join(process.cwd(), './upload'));
    return new StreamableFile(file);
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads', // Destination folder for uploaded files
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          callback(null, `${randomName}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  update(
    @UploadedFile() file: Express.Multer.File,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productService.update(file, id, updateProductDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.productService.remove(name);
  }
}
