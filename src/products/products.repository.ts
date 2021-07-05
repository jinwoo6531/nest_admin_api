import { EntityRepository, Repository, SelectQueryBuilder } from 'typeorm';
import { GetProductsFilterDto } from './dto/get-products-filter.dto';
import { ProductEntity } from './entities/product.entity';
import { MetaData } from '../common/models/meta.model';
import { UserEntity } from 'src/users/entities/user.entity';

@EntityRepository(ProductEntity)
export class ProductsRepository extends Repository<ProductEntity> {
  private init(user: UserEntity): SelectQueryBuilder<ProductEntity> {
    const user_id = user ? user.id : null;
    return this.createQueryBuilder('a')
      .innerJoin('product_category', 'b', 'a.id = b.product_id')
      .innerJoinAndMapMany(
        'a.categories',
        'category',
        'c',
        'b.category_id = c.id',
      )
      .innerJoinAndMapMany(
        'a.thumbnails',
        'thumbnail',
        'd',
        'a.id = d.product_id',
      )
      .innerJoinAndMapMany('a.thumbnails', 'image', 'e', 'd.image_id = e.id')
      .innerJoinAndMapOne('a.store', 'store', 'f', 'a.store_id = f.id')
      .leftJoin('product_tag', 'g', 'a.id = g.product_id')
      .leftJoinAndMapMany('a.tags', 'tag', 'h', 'g.tag_id = h.id')
      .leftJoinAndMapOne(
        'a.favorite',
        'favorite',
        'x',
        'a.id = x.product_id and x.user_id = :user_id',
        { user_id },
      );
  }

  async filter(dto: GetProductsFilterDto): Promise<MetaData> {
    const { page, rows, category_id, district_code, store_id } = dto;
    // const query = this.init(user).where('a.use_yn = "Y"');
    const query = this.init(null).where('1 = 1');

    if (store_id) {
      query.andWhere('a.store = :store_id', { store_id });
    }

    // 검색어
    // if (q) {
    //   query
    //     .leftJoin('product_tag', 'aa', 'a.id = aa.product_id')
    //     .leftJoin('tag', 'bb', 'aa.tag_id = bb.id')
    //     .andWhere('bb.title like concat("%", :q, "%")', { q });
    // }

    // 분류
    if (category_id) {
      query
        .innerJoin('product_category', 'cc', 'a.id = cc.product_id')
        .andWhere('cc.category_id = :category_id', { category_id });
    }

    // 지역 코드 조회
    if (district_code) {
      query
        .innerJoin('store_district', 'dd', 'a.store_id = dd.store_id')
        .andWhere('dd.district_code = :district_code', { district_code });
    }

    // 즐겨찾기 목록만 조회
    // if (only_favorite && user) {
    //   const user_id = user.id;
    //   query
    //     .innerJoin('favorite', 'dd', 'a.id = dd.product_id')
    //     .andWhere('dd.user_id = :user_id', { user_id });
    // } else if (only_favorite) {
    //   query.andWhere('1 = 0');
    // }

    // 정렬
    // if (order === 'best') {
    //   query.orderBy('a.favorite_count', 'DESC');
    // }

    const total = await query.getCount();

    query.take(rows).skip((page - 1) * rows);
    const data = await query.getMany();

    return { meta: { total }, data };
  }

  async getItems(): Promise<ProductEntity[]> {
    return await this.init(null).getMany();
  }

  async getItemById(id: number): Promise<ProductEntity> {
    return await this.init(null).where('a.id = :id', { id }).getOne();
  }
}
