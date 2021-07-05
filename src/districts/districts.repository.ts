import { EntityRepository, Repository } from "typeorm";
import { DistrictEntity } from "./entities/district.entity";

@EntityRepository(DistrictEntity)
export class DistrictsRepository extends Repository<DistrictEntity> {}
