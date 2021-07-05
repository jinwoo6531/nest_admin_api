import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SigninStoreDto {
  @ApiProperty({ description: '상호명' })
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  password: string;
}
