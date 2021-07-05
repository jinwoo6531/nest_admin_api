import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { LocationEntity } from "./entities/location.entity";
import { LocationsService } from './locations.service';
import { UserEntity } from '../users/entities/user.entity';
import { GetUser } from '../common/decorators/get-user.decorator';
import { CreateLocationDto } from './dto/create-location.dto';
import { GetLocationsResponse } from './responses/get-locations.response';
import { BaseResponse } from '../common/responses/base.response';
import { AffectedRows } from '../common/interfaces/custom.interface';
import { AffectedRowsResponse } from '../common/responses/success.response';

@Controller('locations')
@UseGuards(AuthGuard())
@ApiTags('사용자')
@ApiBearerAuth()
export class LocationsController {
  constructor(private readonly locationsService: LocationsService) {}

  @Get()
  @ApiOperation({ summary: '장소 목록' })
  @ApiOkResponse({ description: 'Success', type: GetLocationsResponse })
  find(@GetUser() user: UserEntity): Promise<LocationEntity[]> {
    return this.locationsService.find(user);
  }

  @Post()
  @ApiOperation({ summary: '장소 추가' })
  @ApiBody({ type: CreateLocationDto })
  @ApiCreatedResponse({ description: 'Success', type: AffectedRowsResponse })
  create(
    @Body(ValidationPipe) dto: CreateLocationDto,
    @GetUser() user: UserEntity,
  ): Promise<AffectedRows> {
    return this.locationsService.create(dto, user);
  }

  @Delete(':id')
  @ApiOperation({ summary: '장소 삭제' })
  @ApiCreatedResponse({ description: 'Success', type: BaseResponse })
  remove(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: UserEntity,
  ): Promise<AffectedRows> {
    return this.locationsService.remove(id, user);
  }
}
