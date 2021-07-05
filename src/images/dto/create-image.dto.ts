import { IsNotEmpty } from "class-validator";

export class CreateImageDto {
  @IsNotEmpty()
  platform_key: string;

  @IsNotEmpty()
  url: string;

  @IsNotEmpty()
  width: number;

  @IsNotEmpty()
  height: number;

  @IsNotEmpty()
  size: number;
}
