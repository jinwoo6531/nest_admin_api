import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { ImagesRepository } from './images.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([ImagesRepository]),
  ],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule {}
