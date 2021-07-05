import { Controller, Post, Body, ValidationPipe } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse, ApiCreatedResponse } from "@nestjs/swagger";
import { AffectedRows, IsExist } from "src/common/interfaces/custom.interface";
import { AffectedRowsResponse, IsExistResponse } from "src/common/responses/success.response";
import { AuthsService } from "./auths.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { GetAuthDto } from "./dto/get-auth.dto";
import { AuthSignIn } from "./interfaces/auth-signin.interface";
import { AuthSignInResponse } from "./responses/auth-signin.response";

@ApiTags('가입')
@Controller('auths')
export class AuthsController {
  constructor(private authsService: AuthsService) {}

  @Post('signin')
  @ApiOperation({ summary: '로그인' })
  @ApiBody({ type: AuthCredentialsDto })
  @ApiOkResponse({ description: 'Success', type: AuthSignInResponse })
  signIn(@Body(ValidationPipe) dto: AuthCredentialsDto): Promise<AuthSignIn> {
    return this.authsService.signIn(dto);
  }

  @Post('signup')
  @ApiOperation({ summary: '가입' })
  @ApiBody({ type: AuthCredentialsDto })
  @ApiCreatedResponse({ description: 'Success', type: AffectedRowsResponse })
  signUp(@Body(ValidationPipe) dto: AuthCredentialsDto): Promise<AffectedRows> {
    return this.authsService.signUp(dto);
  }

  @Post('is-exist')
  @ApiOperation({ summary: '가입 여부 확인' })
  @ApiBody({ type: GetAuthDto })
  @ApiCreatedResponse({ description: 'Success', type: IsExistResponse })
  isExist(
    @Body(ValidationPipe) dto: GetAuthDto,
  ): Promise<IsExist> {
    return this.authsService.isExist(dto);
  }
}
