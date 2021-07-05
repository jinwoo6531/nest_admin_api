import { IntersectionType, OmitType } from "@nestjs/swagger";
import { CreateAuthDto } from "./create-auth.dto";
import { CreateDeviceDto } from "src/devices/dto/create-device.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";

export class AuthCredentialsDto extends IntersectionType(
  IntersectionType(
    OmitType(CreateAuthDto, ['user_id']),
    OmitType(CreateDeviceDto, ['user_id'])
  ),
  OmitType(CreateUserDto, ['nickname'])
) {}
