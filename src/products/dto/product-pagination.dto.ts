import { ApiProperty } from "@nestjs/swagger";
import { ProductResponseDto } from "./product-response.dto";
import { MetaPaginationDto } from "src/common/dto/meta-pagination.dto";

export class ProductPaginationDto {
  @ApiProperty({ type: ProductResponseDto, isArray: true })
  data: ProductResponseDto[];
  
  @ApiProperty({ type: MetaPaginationDto })
  meta: MetaPaginationDto;
}