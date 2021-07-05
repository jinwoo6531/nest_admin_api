import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevicesService } from './devices.service';
import { DevicesController } from './devices.controller';
import { DevicesRepository } from './devices.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([DevicesRepository]),
  ],
  controllers: [DevicesController],
  providers: [DevicesService]
})
export class DevicesModule {}
