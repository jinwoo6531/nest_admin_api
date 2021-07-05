import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TagEntity } from './entities/tag.entity';
import { TagsRepository } from './tags.repository';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(TagsRepository)
    private readonly tagsRepository: TagsRepository,
  ) {}

  async findOne(title: string): Promise<TagEntity> {
    await this.tagsRepository.upsert(title);
    return await this.tagsRepository.findOne({ title });
  }
}
