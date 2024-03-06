/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware } from '@nestjs/common';
import * as multer from 'multer';

@Injectable()
export class MulterMiddleware implements NestMiddleware {
  constructor() {}

  use(req: any, res: any, next: () => void) {
    multer().single('file')(req, res, err => {
      if (err) {
        return res.status(400).json({ message: 'Error uploading file' });
      }
      next();
    });
  }
}