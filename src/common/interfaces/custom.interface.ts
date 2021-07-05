import { ApiProperty } from "@nestjs/swagger";

export class AffectedRows {
  @ApiProperty({ description: '적용 데이터 개수'})
  rows: number;
}

export class IsExist {
  @ApiProperty({ description: '존재여부' })
  exist_yn: string;
}
