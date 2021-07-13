import { ApiProperty, ApiPropertyOptional, OmitType } from "@nestjs/swagger";
import { IsNotEmpty, IsIn, IsOptional, IsEmail, Length, IsUUID } from "class-validator";

export class AuthDto {
  @ApiProperty({ description: '플랫폼 유형', enum: ['apple', 'kakao', 'naver']})
  @IsNotEmpty()
  @IsIn(['apple', 'kakao', 'naver'])
  platform_type: string;

  @ApiProperty({ description: '플랫폼 사용자 구분자' })
  @IsNotEmpty()
  platform_key: string;
}

export class AuthCredentialsDto extends AuthDto {
  @ApiPropertyOptional({ description: '이메일' })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ description: '출생년도' })
  @IsOptional()
  @Length(4, 4)
  birth_year: string;

  @ApiPropertyOptional({ description: '성별', enum: ['M', 'F'] })
  @IsOptional()
  @IsIn(['M', 'F'])
  gender: string;

  @ApiProperty({ description: '푸시 토큰' })
  @IsNotEmpty()
  message_token: string;

  @ApiProperty({ description: '기기 구분자' })
  @IsNotEmpty()
  @IsUUID()
  uuid: string;

  @ApiProperty({ description: '모델' })
  @IsNotEmpty()
  model: string;

  @ApiProperty({ description: 'OS 이름' })
  @IsNotEmpty()
  @IsIn(['ios', 'android', 'test'])
  os_name: string;

  @ApiProperty({ description: 'OS 버전' })
  @IsNotEmpty()
  os_version: string;

  @ApiProperty({ description: '앱 버전' })
  @IsNotEmpty()
  app_version: string;
}

export class AuthSignOutDto {
  @ApiProperty({ description: '기기 구분자' })
  @IsNotEmpty()
  @IsUUID()
  uuid: string;
}
