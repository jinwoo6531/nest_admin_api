import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsIn, IsNotEmpty, IsOptional, Length } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  nickname: string;

  @ApiPropertyOptional({ description: '이메일' })
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({ description: '출생년도' })
  @IsOptional()
  @Length(4, 4)
  birth_year: string;

  @ApiPropertyOptional({ description: '성별', enum: ['M', 'F'] })
  @IsOptional()
  @IsIn(['M', 'F'])
  gender: string;
}
