import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthsService } from './auths.service';

@ApiTags('가입')
@Controller('auths')
export class AuthsController {
  constructor(private authsService: AuthsService) {}
}
