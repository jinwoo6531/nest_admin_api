import { ApiProperty } from "@nestjs/swagger";
import { IsIn, IsNotEmpty, IsUUID } from "class-validator";

export class CreateDeviceDto {
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

  @ApiProperty({ description: '푸시 토큰' })
  @IsNotEmpty()
  message_token: string;

  @IsNotEmpty()
  user_id: number;
}
