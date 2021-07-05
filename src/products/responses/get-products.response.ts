import { ApiProperty } from '@nestjs/swagger';
import {
  BaseResponse,
  PagingBaseResponse,
} from '../../common/responses/base.response';
import { ProductEntity } from '../entities/product.entity';

export abstract class GetProductResponse extends BaseResponse {
  @ApiProperty()
  data: ProductEntity;
}

export abstract class GetProductsPagingResponse extends PagingBaseResponse {
  @ApiProperty({ isArray: true })
  data: ProductEntity;
}
