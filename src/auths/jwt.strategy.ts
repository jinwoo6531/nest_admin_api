import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { UserEntity } from "src/users/entities/user.entity";
import { UsersRepository } from "src/users/users.repository";
import { JwtPayload } from "./interfaces/jwt-payload.interface";
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly config: ConfigService,
    private usersRepository: UsersRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: config.get<string>('JWT_SECRET'),
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload): Promise<UserEntity> {
    const { user_id } = payload;
    const user: UserEntity = await this.usersRepository.findOne({ id: user_id });
    return user;
  }
}
