import { IsNotEmpty } from "class-validator";
import { UserEntity } from "src/users/entities/user.entity";

export class GetFavoriteDto {
  @IsNotEmpty()
  user: UserEntity;
  
  @IsNotEmpty()
  product_id: number;
}
