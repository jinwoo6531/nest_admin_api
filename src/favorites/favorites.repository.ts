import { EntityRepository, Repository } from "typeorm";
import { FavoriteEntity } from "./entities/favorite.entity";

@EntityRepository(FavoriteEntity)
export class FavoritesRepository extends Repository<FavoriteEntity> {}
