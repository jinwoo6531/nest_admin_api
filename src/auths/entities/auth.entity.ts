import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "src/users/entities/user.entity";
import { Entity, Unique, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: 'auth' })
@Unique(['platform_type', 'platform_key'])
export class AuthEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({ description: '플랫폼 유형', enum: ['apple', 'kakao', 'naver']})
  @Column('varchar', { name: 'platform_type', length: 20 })
  platform_type: string;

  @ApiProperty({ description: '플랫폼 사용자 구분자' })
  @Column('varchar', { name: 'platform_key', length: 100 })
  platform_key: string;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity, { eager: false, nullable: false, cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ApiProperty({ description: '사용자 구분자' })
  @Column('int', { name: 'user_id' })
  user_id: number;

  @Column('timestamp', { name: 'created_at', default: () => 'CURRENT_TIMESTAMP', select: false })
  created_at: Date;

  @Column('timestamp', { name: 'modified_at', default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', select: false })
  modified_at: Date;
}
