/* eslint-disable prettier/prettier */
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { join } from 'path';

export class TypeOrmConfig {
  static getOrmConfig(configService: ConfigService): TypeOrmModuleOptions {
    return {
      type: 'postgres', 
      host: configService.get<string>('DB_HOST'),
      port: configService.get<number>('DB_PORT'),
      username: configService.get<string>('DB_USERNAME'),
      password: configService.get<string>('DB_PASSWORD'),
      database: configService.get<string>('DB_DATABASENAME'),
      entities: [join(__dirname, '..', '**/*.entity{.ts,.js}')],
      synchronize: configService.get<boolean>('DB_SYNCHRONIZE', true), 
    };
  }
}
