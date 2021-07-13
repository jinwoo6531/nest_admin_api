import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { FavoritesRepository } from './favorites.repository';
import { CategoriesRepository } from '../categories/categories.repository';
import { ImagesService } from '../images/images.service';
import { ImagesRepository } from '../images/images.repository';
import { ProductsService } from '../products/products.service';
import { ProductsRepository } from '../products/products.repository';
import { StoresRepository } from '../stores/stores.repository';
import { TagsRepository } from '../tags/tags.repository';
import { TagsService } from '../tags/tags.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoriesRepository]),
    TypeOrmModule.forFeature([FavoritesRepository]),
    TypeOrmModule.forFeature([ImagesRepository]),
    TypeOrmModule.forFeature([ProductsRepository]),
    TypeOrmModule.forFeature([StoresRepository]),
    TypeOrmModule.forFeature([TagsRepository]),
  ],
  controllers: [FavoritesController],
  providers: [FavoritesService, ImagesService, ProductsService, TagsService],
})
export class FavoritesModule {}
