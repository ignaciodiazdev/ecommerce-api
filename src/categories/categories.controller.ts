import { Controller, Get, Post, Body, Patch, Param, Delete, ParseUUIDPipe } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto';
import { Public } from 'src/auth/decorators/public.decorator';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { UserRole } from 'src/common/enums/user-role.enum';
import { ApiCreateOperation, ApiDeleteOperation, ApiGetAllOperation, ApiGetOneOperation, ApiUpdateOperation, ApiGetRelatedOperation } from 'src/common/decorators';
import { Category } from './entities/category.entity';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiCreateOperation('categoria', Category)
  @Roles(UserRole.ADMIN)
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto): Promise<Category> {
    return this.categoriesService.create(createCategoryDto);
  }

  @ApiGetAllOperation('categorías')
  @Public()
  @Get()
  findAll(): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @ApiGetOneOperation('categoría')
  @Public()
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string): Promise<Category> {
    return this.categoriesService.findOne(id);
  }

  @ApiGetRelatedOperation('categoría', 'productos')
  @Public()
  @Get(':id/products')
  getProductsByCategory(@Param('id', ParseUUIDPipe) id: string){
    return {
      categoryId: id,
      products: [],
      message: "Los productos aparecerán cuando el modulo Product este implementado",
    }
  }

  @ApiUpdateOperation('categoría')
  @Roles(UserRole.ADMIN)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto
  ): Promise<Category> {
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @ApiDeleteOperation('categoría')
  @Roles(UserRole.ADMIN)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.categoriesService.remove(id);
  }
}
