import { ApiProperty } from "@nestjs/swagger";
import { Meta } from "../models/meta.model";

export abstract class BaseResponse {
  @ApiProperty({ default: '200' })
  code: number;

  @ApiProperty({ default: '' })
  message: string;
}

export abstract class PagingBaseResponse extends BaseResponse {
  @ApiProperty({ type: Meta })
  meta: Meta
}
