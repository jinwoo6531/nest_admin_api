import { IsNotEmpty, IsIn } from "class-validator";

export class CreateAuthDto {
  @IsNotEmpty()
  @IsIn(['apple', 'kakao', 'naver'])
  platform_type: string;

  @IsNotEmpty()
  platform_key: string;

  @IsNotEmpty()
  user_id: number;
}
