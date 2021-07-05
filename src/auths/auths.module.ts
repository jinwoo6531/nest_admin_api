import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtConfigService } from 'src/common/configurations/jwt.config';
import { DevicesRepository } from 'src/devices/devices.repository';
import { UsersRepository } from 'src/users/users.repository';
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
    TypeOrmModule.forFeature([AuthsRepository]),
    TypeOrmModule.forFeature([DevicesRepository]),
    TypeOrmModule.forFeature([UsersRepository]),
  ],
  providers: [AuthsService, JwtStrategy],
  controllers: [AuthsController],
  exports: [JwtStrategy, PassportModule],
})
export class AuthsModule {}
