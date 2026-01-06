import { ApiProperty } from "@nestjs/swagger";

export class ProductResponseDto {
  @ApiProperty({ description: "ID único del producto", example: "36bfd02a-d9bc-46bb-bdfd-d1faf4d490d4" })
  id: string;

  @ApiProperty({ description: 'Nombre del producto', example: 'Sublime' })
  name: string;

  @ApiProperty({ description: 'Descripción del producto', example: 'Helado bañado en chocolate y maní' })
  description: string;

  @ApiProperty({ description: 'Precio del producto', example: 4.99 })
  price: number;

  @ApiProperty({ description: 'Stock disponible', example: 20 })
  stock: number;

  @ApiProperty({ description: 'Si el producto está activo', example: true })
  isActive: boolean;

  @ApiProperty({ description: 'ID de la categoría a la que pertenece', example: 'f25c1a60-1234-5678-9012-abcdef123456' })
  categoryId: string;

  constructor(partial: Partial<ProductResponseDto>){
    Object.assign(this, partial);
  }
}