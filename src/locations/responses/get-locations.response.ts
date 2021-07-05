import { ApiProperty } from "@nestjs/swagger";
import { BaseResponse } from "../../common/responses/base.response";
import { LocationEntity } from "../entities/location.entity";

export abstract class GetLocationsResponse extends BaseResponse {
  @ApiProperty({ isArray: true })
  data: LocationEntity
}
