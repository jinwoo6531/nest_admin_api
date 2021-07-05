import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import { ImageEntity } from "src/images/entities/image.entity";

export class CreateCategoryDto {
  @ApiProperty({ description: '분류명' })
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: '우선 순위' })
  @IsNotEmpty()
  priority: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  image: ImageEntity;
}
