import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ProductEntity } from './entities/product.entity';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
  exports:[ProductEntity]
})
export class ProductModule {}
