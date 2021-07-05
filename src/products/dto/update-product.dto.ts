import { IsNotEmpty } from 'class-validator';

export class UpdateProductDto {
  @IsNotEmpty()
  use_yn: string;
}
