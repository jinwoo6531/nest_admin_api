import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../users/entities/user.entity';
import { LocationsRepository } from './locations.repository';
import { LocationEntity } from "./entities/location.entity";
import { CreateLocationDto } from './dto/create-location.dto';
import { AffectedRows } from '../common/interfaces/custom.interface';
import { Connection } from 'typeorm';

@Injectable()
export class LocationsService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(LocationsRepository)
    private readonly locationsRepository: LocationsRepository,
  ) {}

  async find(user: UserEntity): Promise<LocationEntity[]> {
    return this.locationsRepository.find({ user });
  }

  async create(dto: CreateLocationDto, user: UserEntity): Promise<AffectedRows> {
    const runner = this.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      dto.user = user;
      const location = await this.locationsRepository.create(dto);
      await runner.manager.save(location);

      await runner.commitTransaction();
      return { rows: 1 };

    } catch (err) {
      await runner.rollbackTransaction();
      throw err;

    } finally {
      await runner.release();
    }
  }

  async remove(id: number, user: UserEntity): Promise<AffectedRows> {
    const runner = this.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const found = await this.locationsRepository.find({ id, user });
      if (!found) return { rows: 0 };
      
      await runner.manager.remove(found);
      await runner.commitTransaction();
      return { rows: 1 };

    } catch (err) {
      await runner.rollbackTransaction();
      throw err;

    } finally {
      await runner.release();
    }
  }
}
