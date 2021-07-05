import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from '../../common/responses/base.response';
import { StoreEntity } from '../entities/store.entity';

export abstract class GetStoresResponse extends BaseResponse {
  @ApiProperty({ isArray: true })
  data: StoreEntity;
}
