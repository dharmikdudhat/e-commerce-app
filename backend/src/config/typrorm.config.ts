import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ContactEntity } from 'src/contact/entities/contact.entity';
import { LogEntity } from 'src/logging/entity/logging.entity';
import { ProductEntity } from 'src/product/entities/product.entity';
import { User } from 'src/user/entities/user.entity';

export class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService) {
    return {
      type: 'postgres',
      host: configService.get('DB_HOST'),
      port: configService.get('DB_PORT'),
      username: configService.get('DB_USERNAME'),
      password: configService.get('DB_PASSWORD'),
      database: configService.get('DB_DATABASE'),
      entities: [User, ContactEntity, ProductEntity, LogEntity],
      synchronize: true,
    };
  }
}

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService): Promise<any> => {
    return TypeOrmConfig.getOrmConfig(configService);
  },
  inject: [ConfigService],
};
