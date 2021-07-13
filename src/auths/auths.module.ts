import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfigService } from 'src/common/configurations/jwt.config';
import { UsersRepository } from '../users/users.repository';
import { AuthsController } from './auths.controller';
import { AuthsRepository } from './auths.repository';
import { AuthsService } from './auths.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      useClass: JwtConfigService,
    }),
    TypeOrmModule.forFeature([AuthsRepository, UsersRepository]),
  ],
  controllers: [AuthsController],
  providers: [AuthsService, JwtStrategy],
  exports: [AuthsService, JwtStrategy, PassportModule],
})
export class AuthsModule {}
