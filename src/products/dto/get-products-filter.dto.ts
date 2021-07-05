import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  Length,
} from 'class-validator';
import { UserEntity } from '../../users/entities/user.entity';

export class GetProductsFilterDto {
  @IsOptional()
  user?: UserEntity;

  @IsNotEmpty()
  @IsNumber()
  store_id: number;

  @IsNotEmpty()
  @IsNumber()
  page: number;

  @IsNotEmpty()
  @IsNumber()
  rows: number;

  @IsOptional()
  order?: string;

  @IsOptional()
  q?: string;

  @IsOptional()
  category_id?: number;

  @IsOptional()
  @IsBoolean()
  only_favorite?: boolean = false;

  @IsOptional()
  @Length(10, 10)
  district_code?: string;
}
