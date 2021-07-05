import { PartialType } from '@nestjs/swagger';
import { GetFavoriteDto } from './get-favorite.dto';

export class CreateFavoriteDto extends PartialType(GetFavoriteDto) {}
