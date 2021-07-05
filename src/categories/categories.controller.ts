import { Controller, Get, UseInterceptors, UseGuards, Param, ParseIntPipe, Query, Post, Body, UploadedFile } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { ApiTags, ApiOperation, ApiOkResponse, ApiBearerAuth, ApiParam, ApiConsumes, ApiBody, ApiCreatedResponse } from "@nestjs/swagger";
import { GetUser } from "src/common/decorators/get-user.decorator";
import { PagingDto } from "src/common/dto/paging.dto";
import { JwtAuthGuard } from "src/common/guards/jwt-auth.guard";
import { AffectedRows } from "src/common/interfaces/custom.interface";
import { MetaData } from "src/common/models/meta.model";
import { AffectedRowsResponse } from "src/common/responses/success.response";
import { GetProductsFilterDto } from "src/products/dto/get-products-filter.dto";
import { ProductsService } from "src/products/products.service";
import { GetProductsPagingResponse } from "src/products/responses/get-products.response";
import { UserEntity } from "src/users/entities/user.entity";
import { CategoriesService } from "./categories.service";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { CategoryEntity } from "./entities/category.entity";
import { GetCategoriesResponse } from "./responses/get-categories.response";

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly productsService: ProductsService,
  ) {}

  @Get()
  @ApiTags('상품')
  @ApiOperation({ summary: '분류 목록' })
  @ApiOkResponse({ description: 'Success', type: GetCategoriesResponse })
  findAll(): Promise<CategoryEntity[]> {
    return this.categoriesService.findAll();
  }

  @Get(':id/products')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('상품')
  @ApiOperation({ summary: '분류별 상품 목록' })
  @ApiParam({ name: 'id', description: '분류 구분자' })
  @ApiOkResponse({ description: 'Success', type: GetProductsPagingResponse })
  findByCategoryId(
    @Param('id', ParseIntPipe) id: number,
    @Query() pagingDto: PagingDto,
    @GetUser() user: UserEntity,
    ): Promise<MetaData> {
    const getProductsFilterDto: GetProductsFilterDto = { user, category_id: id, ...pagingDto };
    return this.productsService.find(getProductsFilterDto);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  @ApiTags('테스트')
  @ApiOperation({ summary: '분류 추가' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateCategoryDto })
  @ApiCreatedResponse({ description: 'Success', type: AffectedRowsResponse})
  create(
    @Body() createCategoryDto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<AffectedRows> {
    return this.categoriesService.create(file, createCategoryDto);
  }
}
