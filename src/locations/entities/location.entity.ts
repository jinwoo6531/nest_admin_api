import { UserEntity } from "../../users/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { DistrictEntity } from "src/districts/entities/district.entity";

@Entity({ name: 'location' })
export class LocationEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({ description: '도로명 주소' })
  @Column('varchar', { name: 'road_address', length: 1000 })
  road_address: string;

  @ApiPropertyOptional({ description: '상세 주소' })
  @Column('varchar', { name: 'detail_address', length: 1000, default: '' })
  detail_address: string;

  @ApiPropertyOptional({ description: '건물명' })
  @Column('varchar', { name: 'building_name', length: 100, default: '' })
  building_name: string;

  @ApiProperty({ description: '경도, 소수점 6자리까지' })
  @Column('decimal', { name: 'longitude', precision: 10, scale: 6 })
  longitude: number;

  @ApiProperty({ description: '위도, 소수점 6자리까지' })
  @Column('float', { name: 'latitude', precision: 10, scale: 6 })
  latitude: number;

  @ApiProperty({ type: () => DistrictEntity })
  @OneToOne(() => DistrictEntity, { eager: false, nullable: false, cascade: true })
  @JoinColumn({ name: 'district_code' })
  district_code: string;

  @ManyToOne(() => UserEntity, {
    eager: false, nullable: false, cascade: true
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column('timestamp', { name: 'created_at', default: () => 'CURRENT_TIMESTAMP', select: false })
  created_at: Date;

  @Column('timestamp', { name: 'modified_at', default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', select: false })
  modified_at: Date;
}
