import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCategoryDto {
  /**
   * Nombre de la categoría
   * @example 'Televisores'
  */
  @IsString()
  @IsNotEmpty()
  @Length(5, 255)
  name: string;
}