import { EntityRepository, Repository } from "typeorm";
import { CategoryEntity } from "./entities/category.entity";

@EntityRepository(CategoryEntity)
export class CategoriesRepository extends Repository<CategoryEntity> {}
