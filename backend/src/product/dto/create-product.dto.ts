/* eslint-disable prettier/prettier */
export class CreateProductDto {
    name: string;
    description: string;
    price: number;
    quantity: number;
    imagePath: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;

}
