import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CategoriesService } from 'src/categories/categories.service';
import { CreateProductDto, UpdateProductDto, ProductResponseDto, ProductPaginationDto } from './dto';
import { ProductMapper } from './mappers/product.mapper';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly categoryService: CategoriesService,
  ){}

  async create(createProductDto: CreateProductDto): Promise<ProductResponseDto> {
    const { categoryId, ...productData } = createProductDto;
    const category = await this.categoryService.findOne(categoryId);

    const product = this.productRepository.create({
      ...productData,
      category
    });
    const savedProduct = await this.productRepository.save(product);

    return ProductMapper.toReponseDto(savedProduct);
  }

  async findAll(page = 1, limit = 10): Promise<ProductPaginationDto> {
    const [products, total] = await this.productRepository.findAndCount({
      take: limit,
      skip: (page - 1) * 10,
      relations: ['category'],
    });
    
    return {
      data: ProductMapper.toListResponseDto(products),
      meta: {
        totalItems: total,
        itemCount: products.length,
        itemsPerPage: limit,
        totalPages: Math.ceil(total/limit),
        currentPage: page,
      }
    };
  }

  async findOne(id: string): Promise<ProductResponseDto> {
    const product = await this.productRepository.findOneBy({id});
    if(!product) throw new NotFoundException(`Product with ID ${id}, not found`);
    return ProductMapper.toReponseDto(product);
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductResponseDto> {
    let product = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if(!product) throw new NotFoundException(`Product with ID ${id}, not found`);

    if(updateProductDto.categoryId){
      const category = await this.categoryService.findOne(updateProductDto.categoryId);
      product.category = category;
    }

    const updatedProduct = await this.productRepository.save(product);

    return ProductMapper.toReponseDto(updatedProduct);
  }

  async remove(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);
    if(result.affected === 0) throw new NotFoundException(`Product with ID ${id}, not found`);
  }
}