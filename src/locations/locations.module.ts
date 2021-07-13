import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LocationsController } from './locations.controller';
import { LocationsRepository } from './locations.repository';
import { LocationsService } from './locations.service';

@Module({
  imports: [TypeOrmModule.forFeature([LocationsRepository])],
  controllers: [LocationsController],
  providers: [LocationsService],
})
export class LocationsModule {}
