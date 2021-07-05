import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/users/entities/user.entity";

export class AuthSignIn {
  @ApiProperty({ description: '로그인 토큰' })
  access_token: string;
  
  @ApiProperty()
  user: UserEntity;
}
