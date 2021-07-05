import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { FavoritesRepository } from './favorites.repository';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { GetFavoriteDto } from './dto/get-favorite.dto';
import { AffectedRows } from '../common/interfaces/custom.interface';
import { ProductsService } from 'src/products/products.service';

@Injectable()
export class FavoritesService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(FavoritesRepository)
    private readonly favoritesRepository: FavoritesRepository,
    private readonly productsService: ProductsService,
  ) {}

  async create(dto: CreateFavoriteDto): Promise<AffectedRows> {
    const runner = this.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const { user, product_id } = dto;
      const found = await this.favoritesRepository.findOne(dto);
      if (found) return { rows: 0 };

      const favorite = await this.favoritesRepository.create(dto);
      await runner.manager.save(favorite);

      const product = await this.productsService.findOne(product_id);
      const count = await this.favoritesRepository.count({ product_id });
      product.favorite_count = count + 1;
      await runner.manager.save(product);

      await runner.commitTransaction();
      return { rows: 1 };
    } catch (err) {
      await runner.rollbackTransaction();
      throw err;
    } finally {
      await runner.release();
    }
  }

  async remove(dto: GetFavoriteDto): Promise<AffectedRows> {
    const runner = this.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const { user, product_id } = dto;
      const found = await this.favoritesRepository.findOne(dto);
      if (!found) return { rows: 0 };

      await runner.manager.remove(found);

      const product = await this.productsService.findOne(product_id);
      const count = await this.favoritesRepository.count({ product_id });
      product.favorite_count = Math.max(count - 1, 0);
      await runner.manager.save(product);

      await runner.commitTransaction();
      return { rows: 1 };
    } catch (err) {
      await runner.rollbackTransaction();
      throw err;
    } finally {
      await runner.release();
    }
  }
}
