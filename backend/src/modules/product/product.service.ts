/* eslint-disable prettier/prettier */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from '../../Entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly ProductRepository: Repository<ProductEntity>,
  ) {}

  async uploadFile(
    file: Express.Multer.File,
    createProductDto: CreateProductDto,
  ) {
    try {
      const product: ProductEntity = new ProductEntity();
      product.name = createProductDto.name;
      product.description = createProductDto.description;
      product.price = createProductDto.price;
      product.quantity = createProductDto.quantity;
      product.imagePath = file.path;
      product.createdAt = new Date().toString();
      product.updatedAt = new Date().toString();
      await this.ProductRepository.save(product);
      return { message: 'Product Added Successfully', data: null };
    } catch (error) {
      console.log('Error in Product:', error);
      throw new BadRequestException("Can't add the product");
    }
  }

  findAll() {
    try {
      return this.ProductRepository.find();
    } catch (error) {
      console.log('Error in FindALl:', error);
      throw new BadRequestException("Can't get the products");
    }
  }

  findOneById(id: string) {
    try {
      return this.ProductRepository.findOneBy({ id });
    } catch (error) {
      console.log('Error:', error);
      throw new NotFoundException(`The product "${id}" is not found`);
    }
  }

  update(
    file: Express.Multer.File,
    id: string,
    updateProductDto: UpdateProductDto,
  ) {
    try {
      const product: ProductEntity = new ProductEntity();
      product.name = updateProductDto.name;
      product.description = updateProductDto.description;
      product.price = updateProductDto.price;
      product.quantity = updateProductDto.quantity;
      product.updatedAt = new Date().toString();
      product.imagePath = file.path;
      product.id = id;
      this.ProductRepository.save(product);
      return { message: 'Data Updated Successfully', data: null };
    } catch (error) {
      console.log('Error:', error);
      throw new BadRequestException("Can't update the details");
    }
  }

  remove(name: string) {
    try {
      return this.ProductRepository.delete(name);
    } catch (error) {
      console.log('Error:', error);
      throw new NotFoundException(
        `The product with id "${name}" was not found`,
      );
    }
  }
}
