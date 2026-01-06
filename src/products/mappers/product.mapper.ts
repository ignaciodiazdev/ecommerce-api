import { ProductResponseDto } from "../dto/product-response.dto";
import { Product } from "../entities/product.entity";

export class ProductMapper {

  static toReponseDto(product: Product): ProductResponseDto {
    return new ProductResponseDto({
      id          : product.id,
      name        : product.name,
      description : product.description,
      price       : product.price,
      stock       : product.stock,
      isActive    : product.isActive,
      categoryId  : product.categoryId,
    });
  }

  static toListResponseDto(products: Product[]): ProductResponseDto[] {
    return products.map(product => this.toReponseDto(product));
  }
}