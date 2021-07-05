import { ApiProperty } from '@nestjs/swagger';

export class Meta {
  @ApiProperty()
  total: number;
}

export class MetaData {
  meta: Meta;
  data: any;
}
