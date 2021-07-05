import { ApiProperty } from "@nestjs/swagger";
import { ProductEntity } from "src/products/entities/product.entity";
import { UserEntity } from "src/users/entities/user.entity";
import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity({ name: 'favorite' })
export class FavoriteEntity extends BaseEntity {
  @ApiProperty()
  @PrimaryColumn('int')
  user_id: number;

  @ApiProperty()
  @PrimaryColumn('int')
  product_id: number;

  @ApiProperty({ type: () => UserEntity })
  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  @ApiProperty({ type: () => ProductEntity })
  @ManyToOne(() => ProductEntity)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @Column('timestamp', { name: 'created_at', default: () => 'CURRENT_TIMESTAMP', select: false })
  created_at: Date;

  @Column('timestamp', { name: 'modified_at', default: () => 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', select: false })
  modified_at: Date;
}
