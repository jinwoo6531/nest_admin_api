import { EntityRepository, Repository } from "typeorm";
import { UpdateUserDto } from "./dto/update-user.dto";
import { UserEntity } from "./entities/user.entity";

@EntityRepository(UserEntity)
export class UsersRepository extends Repository<UserEntity> {
  async upsert(id: number, dto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) return await this.create({ id, ...dto });

    if (dto.nickname) user.nickname = dto.nickname;
    if (dto.email) user.email = dto.email;
    if (dto.birth_year) user.birth_year = dto.birth_year;
    if (dto.gender) user.gender = dto.gender;
    return user;
  }
}
