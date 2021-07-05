import { ApiProperty } from "@nestjs/swagger";
import { AffectedRows, IsExist } from "../interfaces/custom.interface";
import { BaseResponse } from "./base.response";

export abstract class AffectedRowsResponse extends BaseResponse {
  @ApiProperty()
  data: AffectedRows;
}

export abstract class IsExistResponse extends BaseResponse {
  @ApiProperty()
  data: IsExist;
}
