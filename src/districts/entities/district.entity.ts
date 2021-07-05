import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity, Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'district' })
export class DistrictEntity extends BaseEntity {
  @ApiProperty({ description: '지역 코드' })
  @PrimaryColumn('char', { length: 10 })
  code: string;

  @ApiProperty({ description: '시도 이름' })
  @Column('varchar', { name: 'sido_name', length: 100 })
  sido_name: string;

  @ApiProperty({ description: '시군구 이름' })
  @Column('varchar', { name: 'sigungu_name', length: 100 })
  sigungu_name: string;

  @ApiProperty({ description: '지역 이름' })
  @Column('varchar', { name: 'name', length: 100 })
  name: string;

  @Column('timestamp', {
    name: 'created_at',
    default: () => 'CURRENT_TIMESTAMP',
    select: false,
  })
  created_at: Date;

  @Column('timestamp', {
    name: 'modified_at',
    default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP',
    select: false,
  })
  modified_at: Date;
}
