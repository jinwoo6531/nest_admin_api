import { EntityRepository, Repository } from "typeorm";
import { TagEntity } from "./entities/tag.entity";

@EntityRepository(TagEntity)
export class TagsRepository extends Repository<TagEntity> {

  async upsert(title: string): Promise<void> {
    const createTagDto = { title };
    const tag = await this.findOne(createTagDto);
    if (!tag) {
      await this.insert(createTagDto);
    }
  }
}
