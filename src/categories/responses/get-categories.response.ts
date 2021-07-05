import { ApiProperty } from "@nestjs/swagger";
import { BaseResponse } from "src/common/responses/base.response";
import { CategoryEntity } from "../entities/category.entity";

export abstract class GetCategoriesResponse extends BaseResponse {
  @ApiProperty({ isArray: true })
  data: CategoryEntity
}
