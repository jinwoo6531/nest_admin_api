import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';

import { UsersRepository } from '../users/users.repository';
import { Connection } from 'typeorm';
import { AuthsRepository } from './auths.repository';

@Injectable()
export class AuthsService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(AuthsRepository)
    private readonly authsRepository: AuthsRepository,

    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
  ) {}
}
