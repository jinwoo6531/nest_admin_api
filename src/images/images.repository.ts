import { EntityRepository, Repository } from "typeorm";
import { ImageEntity } from "./entities/image.entity";

@EntityRepository(ImageEntity)
export class ImagesRepository extends Repository<ImageEntity> {}
