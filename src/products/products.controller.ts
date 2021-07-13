import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  GetProductResponse,
  GetProductsPagingResponse,
} from './responses/get-products.response';
import { FilesInterceptor } from '@nestjs/platform-express';
import { MetaData } from '../common/models/meta.model';
import { JwtAuthGuard } from '../common/guards/jwt-auth.guard';
import { AffectedRows } from '../common/interfaces/custom.interface';
import { AffectedRowsResponse } from '../common/responses/success.response';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { ProductsService } from './products.service';
import { ProductEntity } from './entities/product.entity';
import { FavoritesService } from '../favorites/favorites.service';
import { GetProductsPagingDto } from './dto/get-products-paging.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(
    // private readonly favoritesService: FavoritesService,
    private readonly productsService: ProductsService,
  ) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('상품')
  @ApiOperation({ summary: '상품 목록' })
  @ApiOkResponse({ description: 'Success', type: GetProductsPagingResponse })
  findAll(@Query() pagingDto: GetProductsPagingDto): Promise<MetaData> {
    const getProductsFilterDto: GetProductsFilterDto = { ...pagingDto };
    return this.productsService.find(getProductsFilterDto);
  }

  //사용중지
  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateProductDto) {
    await this.productsService.update(id, {
      use_yn: body.use_yn,
    });
    return this.productsService.findOne(id);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiTags('상품')
  @ApiOperation({ summary: '상품 정보' })
  @ApiOkResponse({ description: 'Success', type: GetProductResponse })
  findOne(@Param('id', ParseIntPipe) id: number): Promise<ProductEntity> {
    return this.productsService.findOne(id);
  }

  @Post()

  // deprecated
  @Post()
  @UseInterceptors(FilesInterceptor('thumbnails'))
  @ApiTags('테스트')
  @ApiOperation({ summary: '상품 추가' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({ type: CreateProductDto })
  @ApiCreatedResponse({ description: 'Success', type: AffectedRowsResponse })
  create(
    @Body(ValidationPipe) dto: CreateProductDto,
    @UploadedFiles() files: Array<Express.Multer.File>,
  ): Promise<AffectedRows> {
    return this.productsService.create(files, dto);
  }
}
