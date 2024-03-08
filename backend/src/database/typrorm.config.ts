/* eslint-disable prettier/prettier */
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ContactEntity } from 'src/Entities/contact.entity';
import { LogEntity } from '../Entities/logging.entity';
import { ProductEntity } from '../Entities/product.entity';
import { User } from '../Entities/user.entity';

export default class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService) {
    return {
      type: 'postgres',
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASE'),
      entities: [User, ContactEntity, ProductEntity, LogEntity],
      synchronize: true,
    };
  }
}

export const typeOrmConfig: TypeOrmModuleAsyncOptions = {
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env',
    }),
  ],
  useFactory: async (configService: ConfigService): Promise<any> => {
    return TypeOrmConfig.getOrmConfig(configService);
  },
  inject: [ConfigService],
};
