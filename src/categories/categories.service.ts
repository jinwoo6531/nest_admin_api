import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { AffectedRows } from '../common/interfaces/custom.interface';
import { ImagesService } from '../images/images.service';
import { Connection, FindManyOptions } from 'typeorm';
import { CategoryEntity } from './entities/category.entity';
import { CategoriesRepository } from './categories.repository';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(CategoriesRepository)
    private readonly categoriesRepository: CategoriesRepository,
    private readonly imagesService: ImagesService,
  ) {}
  
  private options: FindManyOptions<CategoryEntity> = {
    relations: ['image'],
    order: { priority: 'ASC' }
  }

  async findAll(): Promise<CategoryEntity[]> {
    return await this.categoriesRepository.find(this.options);
  }

  async create(file: Express.Multer.File, dto: CreateCategoryDto): Promise<AffectedRows> {
    let image = null;

    const runner = this.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      let rows = 0;
      
      image = await this.imagesService.create('categories', file);
      await runner.manager.save(image);

      const { name, priority } = dto;
      const createCategoryDto: CreateCategoryDto = { name, priority, image };
      const category = await this.categoriesRepository.create(createCategoryDto);
      await runner.manager.save(category);

      rows = 1;

      await runner.commitTransaction();
      return { rows };

    } catch (err) {
      if (image !== null) await this.imagesService.remove(image);
      await runner.rollbackTransaction();
      throw err;

    } finally {
      await runner.release();
    }
  }
}
