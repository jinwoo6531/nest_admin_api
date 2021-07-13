import { ApiProperty } from '@nestjs/swagger';
import {
  AfterLoad,
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ApiProperty({ description: '닉네임' })
  @Column('varchar', { length: 50 })
  nickname: string;

  @ApiProperty({ description: '이메일' })
  @Column('varchar', { length: 100, nullable: true })
  email: string;

  @ApiProperty({ description: '출생년도' })
  @Column('char', { length: 4, nullable: true })
  birth_year: string;

  @ApiProperty({ description: '성별', enum: ['M', 'F'] })
  @Column('char', { length: 1, nullable: true })
  gender: string;

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

  @AfterLoad()
  finish() {
    // 공백 처리
    if (this.email === null) this.email = '';
    if (this.birth_year === null) this.birth_year = '';
    if (this.gender === null) this.gender = '';
  }
}
