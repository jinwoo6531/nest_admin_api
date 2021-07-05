import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { DistrictsRepository } from 'src/districts/districts.repository';
import { Connection } from 'typeorm';
import { AffectedRows } from '../common/interfaces/custom.interface';
import { CreateStoreDto } from './dto/create-store.dto';
import { StoreEntity } from './entities/store.entity';
import { StoresRepository } from './stores.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class StoresService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(DistrictsRepository)
    private readonly districtsRepository: DistrictsRepository,
    @InjectRepository(StoresRepository)
    private readonly storesRepository: StoresRepository,
  ) {}

  async findOne(id: number): Promise<StoreEntity> {
    return await this.storesRepository.findOne(id);
  }

  // deprecated
  async findAll(): Promise<StoreEntity[]> {
    return await this.storesRepository.find();
  }

  // deprecated
  async create(dto: CreateStoreDto): Promise<AffectedRows> {
    const runner = this.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const {
        bnum,
        name,
        password,
        road_address,
        detail_address,
        longitude,
        latitude,
        phone,
      } = dto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);
      const districts = await this.districtsRepository.find();

      const store = await this.storesRepository.create({
        bnum,
        name,
        road_address,
        detail_address,
        longitude,
        latitude,
        phone,
        districts,
        owner_name: '',
        password: hashedPassword,
        salt: '',
      });
      await runner.manager.save(store);
      await runner.commitTransaction();
      return { rows: 1 };
    } catch (err) {
      await runner.rollbackTransaction();
      throw err;
    } finally {
      await runner.release();
    }
  }
  async findById(condition): Promise<StoreEntity> {
    return this.storesRepository.findOne(condition);
  }
}
