import { EntityRepository, Repository } from 'typeorm';
import { StoreEntity } from './entities/store.entity';

@EntityRepository(StoreEntity)
export class StoresRepository extends Repository<StoreEntity> {}
