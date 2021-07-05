import { OmitType } from '@nestjs/swagger';
import { CreateDeviceDto } from './create-device.dto';

export class UpdateDeviceDto extends OmitType(CreateDeviceDto, ['uuid']) {}
