import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { IsEmpty, IsLatitude, IsLongitude, IsNotEmpty, IsOptional, Length } from "class-validator";
import { UserEntity } from "../../users/entities/user.entity";

export class CreateLocationDto {
  @ApiProperty({ description: '도로명 주소' })
  @IsNotEmpty()
  road_address: string;

  @ApiPropertyOptional({ description: '상세 주소' })
  @IsOptional()
  detail_address?: string;

  @ApiPropertyOptional({ description: '건물명' })
  @IsOptional()
  building_name?: string;

  @ApiProperty({ description: '경도, 소수점 6자리까지' })
  @IsNotEmpty()
  @IsLongitude()
  longitude: number;

  @ApiProperty({ description: '위도, 소수점 6자리까지' })
  @IsNotEmpty()
  @IsLatitude()
  latitude: number;

  @ApiProperty({ description: '지역 코드' })
  @IsNotEmpty()
  @Length(10, 10)
  district_code: string;

  @IsEmpty()
  user: UserEntity;
}
