import { ApiProperty } from "@nestjs/swagger";
import { BaseResponse } from "src/common/responses/base.response";
import { AuthSignIn } from "../interfaces/auth-signin.interface";

export abstract class AuthSignInResponse extends BaseResponse {
  @ApiProperty()
  data: AuthSignIn;
}
