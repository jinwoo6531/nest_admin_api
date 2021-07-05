import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

export class PagingDto {
  @ApiProperty({ description: '페이지수', default: 1 })
  @IsNotEmpty()
  page: number;

  @ApiProperty({ description: '게시물수', default: 20 })
  @IsNotEmpty()
  rows: number;

  @IsNotEmpty()
  store_id: number;

  @ApiPropertyOptional({ description: '정렬' })
  @IsOptional()
  @IsIn(['best'])
  order?: string;
}

export class SearchDto extends PagingDto {
  @ApiProperty({ description: '검색어' })
  @IsNotEmpty()
  q: string;
}
