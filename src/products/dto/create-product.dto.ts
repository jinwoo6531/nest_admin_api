import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: '제목' })
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  cost_price: number;

  @IsNotEmpty()
  sale_price: number;

  @ApiProperty({ description: '분류 구분자' })
  @IsNotEmpty()
  category_ids: number[];

  @ApiProperty({ description: '스토어 구분자' })
  @IsNotEmpty()
  store_id: number;

  @ApiProperty({ description: '태그' })
  @IsOptional()
  tag_titles: string[] = [];
}
