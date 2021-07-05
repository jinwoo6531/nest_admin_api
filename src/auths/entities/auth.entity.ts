import { UserEntity } from "src/users/entities/user.entity";
import { Entity, Unique, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";

@Entity({ name: 'auth' })
@Unique(['platform_type', 'platform_key'])
export class AuthEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column('varchar', { name: 'platform_type', length: 20 })
  platform_type: string;

  @Column('varchar', { name: 'platform_key', length: 100 })
  platform_key: string;

  @Column('int')
  user_id: number;

  @ManyToOne(() => UserEntity, { eager: false, nullable: false, cascade: true })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @Column('timestamp', { name: 'created_at', default: () => 'CURRENT_TIMESTAMP', select: false })
  created_at: Date;

  @Column('timestamp', { name: 'modified_at', default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', select: false })
  modified_at: Date;
}
