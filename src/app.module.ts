import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from './common/configurations/typeorm.config';
import { AuthsModule } from './auths/auths.module';
import { CategoriesModule } from './categories/categories.module';
import { ImagesModule } from './images/images.module';
import { LocationsModule } from './locations/locations.module';
import { ProductsModule } from './products/products.module';
import { StoresModule } from './stores/stores.module';
import { UsersModule } from './users/users.module';
import { FavoritesModule } from './favorites/favorites.module';
import { TagsModule } from './tags/tags.module';
import { DevicesModule } from './devices/devices.module';
import { DistrictsModule } from './districts/districts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['../.development.env', '../.production.env'],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
    }),
    AuthsModule,
    CategoriesModule,
    DevicesModule,
    DistrictsModule,
    FavoritesModule,
    ImagesModule,
    LocationsModule,
    ProductsModule,
    StoresModule,
    TagsModule,
    UsersModule,
  ],
})
export class AppModule {}
