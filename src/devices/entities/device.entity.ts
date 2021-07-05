import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ApiProperty } from "@nestjs/swagger";
import { UserEntity } from "../../users/entities/user.entity";

@Entity({ name: 'device' })
export class DeviceEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid', { name: 'id' })
  uuid: string;

  @ApiProperty({ description: '모델' })
  @Column('text', { name: 'model' })
  model: string;

  @ApiProperty({ description: 'OS 이름' })
  @Column('varchar', { name: 'os_name', length: 100 })
  os_name: string;

  @ApiProperty({ description: 'OS 버전' })
  @Column('varchar', { name: 'os_version', length: 10 })
  os_version: string;

  @ApiProperty({ description: '앱 버전' })
  @Column('varchar', { name: 'app_version', length: 10 })
  app_version: string;

  @ApiProperty({ description: '푸시 토큰' })
  @Column('text', { name: 'message_token' })
  message_token: string;

  @Column('int')
  user_id: number;

  @ManyToOne(() => UserEntity, { eager: false, nullable: true, cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column('timestamp', { name: 'created_at', default: () => 'CURRENT_TIMESTAMP', select: false })
  created_at: Date;

  @Column('timestamp', { name: 'modified_at', default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', select: false })
  modified_at: Date;
}
