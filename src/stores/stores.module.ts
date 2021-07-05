import { Module } from '@nestjs/common';
import { StoresService } from './stores.service';
import { StoresController } from './stores.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresRepository } from './stores.repository';
import { DistrictsRepository } from 'src/districts/districts.repository';
import { JwtStrategy } from './jwt-strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt ' }),
    JwtModule.register({
      secret: 'topSecret51',
      signOptions: {
        expiresIn: 3600,
      },
    }),
    TypeOrmModule.forFeature([DistrictsRepository]),
    TypeOrmModule.forFeature([StoresRepository]),
  ],
  providers: [StoresService, JwtStrategy],
  controllers: [StoresController],
  exports: [JwtStrategy, PassportModule],
})
export class StoresModule {}
