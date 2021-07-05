import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty } from "class-validator";

export class GetAuthDto {
  @ApiProperty({ description: '플랫폼 구분', enum: ['apple', 'kakao', 'naver']})
  @IsNotEmpty()
  @IsIn(['apple', 'kakao', 'naver'])
  platform_type: string;

  @ApiProperty({ description: '플랫폼 사용자 구분자' })
  @IsNotEmpty()
  platform_key: string;
}
