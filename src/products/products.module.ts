import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthsModule } from '../auths/auths.module';
import { ProductsController } from './products.controller';
import { ProductsRepository } from './products.repository';
import { ProductsService } from './products.service';
import { ImagesService } from '../images/images.service';
import { CategoriesRepository } from '../categories/categories.repository';
import { ImagesRepository } from '../images/images.repository';
import { StoresRepository } from '../stores/stores.repository';
import { TagsRepository } from '../tags/tags.repository';
import { TagsService } from '../tags/tags.service';
import { FavoritesService } from '../favorites/favorites.service';
import { FavoritesRepository } from '../favorites/favorites.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoriesRepository]),
    TypeOrmModule.forFeature([FavoritesRepository]),
    TypeOrmModule.forFeature([ImagesRepository]),
    TypeOrmModule.forFeature([ProductsRepository]),
    TypeOrmModule.forFeature([StoresRepository]),
    TypeOrmModule.forFeature([TagsRepository]),
    AuthsModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService, FavoritesService, ImagesService, TagsService],
})
export class ProductsModule {}
