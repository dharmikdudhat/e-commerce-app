/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductEntity } from './entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService {

  constructor(@InjectRepository(ProductEntity) private readonly ProductRepository: Repository<any>) { }

  create(createProductDto: CreateProductDto) {
    const product: ProductEntity = new ProductEntity();
    product.name = createProductDto.name;
    product.description = createProductDto.description;
    product.price = createProductDto.price;
    product.quantity = createProductDto.quantity;

    return this.ProductRepository.save(product);
  }

  findAll() {
    return this.ProductRepository.find();
  }

  findOneByName(name: string) {
    return this.ProductRepository.findOneBy({ name });
  }

  update(name: string, updateProductDto: UpdateProductDto) {
    const product: ProductEntity = new ProductEntity();
    product.name = updateProductDto.name;
    product.description = updateProductDto.description;
    product.price = updateProductDto.price;
    product.quantity = updateProductDto.quantity;

    return this.ProductRepository.save(product);
  }

  remove(name: string) {
    return this.ProductRepository.delete(name);
  }
}