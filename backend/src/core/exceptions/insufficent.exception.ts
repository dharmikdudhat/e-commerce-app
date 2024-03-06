import { ConflictException } from '@nestjs/common';

export class InsufficientStockException extends ConflictException {
  constructor(productId: string) {
    super(`Insufficient stock for product with ID ${productId}`);
  }
}
