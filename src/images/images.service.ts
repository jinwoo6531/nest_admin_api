import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateImageDto } from './dto/create-image.dto';
import { ConfigService } from '@nestjs/config';
import { ImageEntity } from './entities/image.entity';
import { ImagesRepository } from './images.repository';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { imageSize } from 'image-size';
import * as path from 'path';

@Injectable()
export class ImagesService {
  constructor(
    private readonly config: ConfigService,
    @InjectRepository(ImagesRepository)
    private readonly imagesRepository: ImagesRepository,
  ) {}

  async create(
    folder: string,
    file: Express.Multer.File,
  ): Promise<ImageEntity> {
    const filename = `${folder}/${uuid()}${path.extname(file.originalname)}`;
    const size = await imageSize(file.buffer);

    const s3 = new S3();
    const params = {
      ACL: 'public-read',
      Body: file.buffer,
      Bucket: this.config.get<string>('S3_BUCKET'),
      ContentType: file.mimetype,
      Key: filename,
    };

    const result = await s3.upload(params).promise();
    const createImageDto: CreateImageDto = {
      platform_key: result.Key,
      url: result.Location,
      width: size.width,
      height: size.height,
      size: file.size,
    };

    return await this.imagesRepository.create(createImageDto);
  }

  async remove(image: ImageEntity): Promise<void> {
    const s3 = new S3();
    const params = {
      Bucket: this.config.get<string>('S3_BUCKET'),
      Key: image.platform_key,
    };
    await s3.deleteObject(params).promise();
    await this.imagesRepository.remove(image);
  }
}
