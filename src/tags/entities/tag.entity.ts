import { ApiProperty } from "@nestjs/swagger";
import { BaseEntity, Column, Entity, Index, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity({ name: 'tag' })
export class TagEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;
  
  @ApiProperty({ description: '제목' })
  @Column('varchar', { name: 'title', length: 200, unique: true })
  title: string;

  @Column('timestamp', { name: 'created_at', default: () => 'CURRENT_TIMESTAMP', select: false })
  created_at: Date;

  @Column('timestamp', { name: 'modified_at', default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', select: false })
  modified_at: Date;
}
