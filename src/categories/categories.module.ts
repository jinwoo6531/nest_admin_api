import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthsModule } from 'src/auths/auths.module';
import { ImagesRepository } from 'src/images/images.repository';
import { ImagesService } from 'src/images/images.service';
import { ProductsRepository } from 'src/products/products.repository';
import { ProductsService } from 'src/products/products.service';
import { StoresRepository } from 'src/stores/stores.repository';
import { TagsRepository } from 'src/tags/tags.repository';
import { TagsService } from 'src/tags/tags.service';
import { CategoriesController } from './categories.controller';
import { CategoriesRepository } from './categories.repository';
import { CategoriesService } from './categories.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CategoriesRepository]),
    TypeOrmModule.forFeature([ImagesRepository]),
    TypeOrmModule.forFeature([ProductsRepository]),
    TypeOrmModule.forFeature([StoresRepository]),
    TypeOrmModule.forFeature([TagsRepository]),
    AuthsModule,
  ],
  controllers: [CategoriesController],
  providers: [
    CategoriesService,
    ImagesService,
    ProductsService,
    TagsService,
  ]
})
export class CategoriesModule {}
