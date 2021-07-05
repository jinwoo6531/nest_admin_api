import { EntityRepository, Repository } from "typeorm";
import { AuthEntity } from "../auths/entities/auth.entity";

@EntityRepository(AuthEntity)
export class AuthsRepository extends Repository<AuthEntity> {}
