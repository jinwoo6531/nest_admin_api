import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { StoreEntity } from './entities/store.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { StoresRepository } from './stores.repository';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(StoresRepository)
    private storesRepository: StoresRepository,
  ) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload): Promise<StoreEntity> {
    const { name } = payload;
    const store: StoreEntity = await this.storesRepository.findOne({ name });

    if (!store) {
      throw new UnauthorizedException();
    }

    return store;
  }
}
