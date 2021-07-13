import { ApiProperty } from '@nestjs/swagger';
import { BaseResponse } from 'src/common/responses/base.response';
import { AuthSignIn } from '../models/auth.model';

export abstract class AuthSignInResponse extends BaseResponse {
  @ApiProperty()
  data: AuthSignIn;
}
