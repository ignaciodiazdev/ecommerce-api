import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsNotEmpty, IsNumber, IsPositive, IsString, IsUUID, Length } from "class-validator";

export class CreateProductDto {
  @ApiProperty({ description: "Nombre del Producto", example: "Sublime" })
  @IsString()
  @IsNotEmpty()
  @Length(3, 255)
  name: string;

  @ApiProperty({ description: "Descripción del Producto", example: "Helado bañado en chocolate y maní" })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: "Precio del Producto", example: 4.99 })
  @IsNumber({maxDecimalPlaces: 2})
  @IsNotEmpty()
  @IsPositive()
  price: number;

  @ApiProperty({ description: "Stock disponible", example: 10 })
  @IsInt()
  @IsNotEmpty()
  @IsPositive()
  stock: number;

  @ApiProperty({ description: "Si el Producto está activo", example: true })
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;

  @ApiProperty({ description: "ID de la categoría a la que pertenece", example: "f25c1a60-1234-5678-9012-abcdef123456" })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}
