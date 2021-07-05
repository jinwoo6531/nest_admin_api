import { Module } from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { TagsRepository } from './tags.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forFeature([TagsRepository]),
  ],
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
