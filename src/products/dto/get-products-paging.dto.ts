import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';
import { PagingDto, SearchDto } from 'src/common/dto/paging.dto';

export class GetProductsPagingDto extends PagingDto {
  @ApiProperty({ description: '지역 코드', default: '1111051500' })
  @IsNotEmpty()
  @Length(10, 10)
  district_code: string;
}

export class GetProductsSearchDto extends SearchDto {
  @ApiProperty({ description: '지역 코드', default: '1111051500' })
  @IsNotEmpty()
  @Length(10, 10)
  district_code: string;
}
