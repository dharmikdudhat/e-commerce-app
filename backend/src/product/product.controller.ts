import { Response, Request } from 'express';
/* eslint-disable prettier/prettier */
import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, Res, UploadedFile, Req } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer'
import * as path from 'path';
import { extname } from 'path';
import * as fs from 'fs';




@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads', // Destination folder for uploaded files
      filename: (req, file, callback) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('');

        callback(null, `${randomName}${extname(file.originalname)}`);
      },
    }),
  }))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // const fileBuffer: Buffer = req.file.buffer;
    // console.log(fileBuffer);
    try {
      console.log(file)

      return { filename: file.filename };
    } catch (error) {
      console.log(error)
    }

  }


 /*  @Get()
  async streamFile(@Res() res: Response) {
    const filePath = 'C:/Users/HP/Desktop/task_with_dhruvik/backend/uploads/dbc16585a5e89e7431eb351067d6954e5.jpg'; // Path to your file
    const fileStream = fs.createReadStream(filePath);

    // Set appropriate headers
    res.setHeader('Content-Type', 'text/plain');
    res.setHeader('Content-Disposition', 'attachment; filename=file.txt');

    // Pipe the file stream to the response
    fileStream.pipe(res);
  }

  @Post('new')
  uploadFiles(@Req() req: Request) {
    const fileBuffer: Buffer = req.file.buffer;
    // Now you have the file buffer, you can use it as needed
    return { message: fileBuffer };
  } */
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFiles(@UploadedFile() file) {
    /* const image = new Image();
    image.data = file.buffer;
    await this.imageRepository.save(image); */
    const image = file.buffer;
    console.log(file)
    return { id: image };
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get(':name')
  findOneByName(@Param('name') name: string) {
    return this.productService.findOneByName(name);
  }

  @Patch(':name')
  update(@Param('name') name: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(name, updateProductDto);
  }

  @Delete(':name')
  remove(@Param('name') name: string) {
    return this.productService.remove(name);
  }
}




