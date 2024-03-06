import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ContactModule } from './contact/contact.module';
import { ProductModule } from './product/product.module';
import { LogModule } from './logging/log.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/Entities';
import { ContactEntity } from 'src/Entities';
import { ProductEntity } from 'src/Entities';
import { LogEntity } from 'src/Entities';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, LogEntity, ProductEntity, ContactEntity]),
    UserModule,
    AuthModule,
    ContactModule,
    ProductModule,
    LogModule,
  ],
  providers: [],
  controllers: [],
  exports: [],
})
export class AllModules {}
