/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as path from 'path';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule,{});

  app.useStaticAssets(path.join("C:/Users/HP/Desktop/task_with_dhruvik/backend/uploads"));

  app.enableCors({
   // origin: 'http://localhost:5173', // replace with your frontend's origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // enable credentials (cookies, authorization headers, etc.)
  });



  await app.listen(3000);
}
bootstrap();
