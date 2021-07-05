import { Controller, Get, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiTags, ApiOperation, ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../common/decorators/get-user.decorator';
import { PagingDto } from '../common/dto/paging.dto';
import { MetaData } from '../common/models/meta.model';
import { ProductsService } from '../products/products.service';
import { GetProductsFilterDto } from '../products/dto/get-products-filter.dto';
import { GetProductsPagingResponse } from '../products/responses/get-products.response';
import { UserEntity } from '../users/entities/user.entity';
import { TransformInterceptor } from 'src/common/interceptors/transform.interceptor';

@Controller('favorites')
@UseInterceptors(TransformInterceptor)
export class FavoritesController {
  constructor(private readonly productsService: ProductsService) {}

  @Get()
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @ApiTags('상품')
  @ApiOperation({ summary: '즐겨찾기 목록' })
  @ApiOkResponse({ description: 'Success', type: GetProductsPagingResponse })
  findAll(
    @Query() pagingDto: PagingDto,
    @GetUser() user: UserEntity,
  ): Promise<MetaData> {
    const filterDto: GetProductsFilterDto = { user, ...pagingDto, only_favorite: true };
    return this.productsService.find(filterDto);
  }
}
