import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { IsExist, AffectedRows } from "src/common/interfaces/custom.interface";
import { DevicesRepository } from "src/devices/devices.repository";
import { UpdateDeviceDto } from "src/devices/dto/update-device.dto";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { UpdateUserDto } from "src/users/dto/update-user.dto";
import { UserEntity } from "src/users/entities/user.entity";
import { UsersRepository } from "src/users/users.repository";
import { Connection } from "typeorm";
import { AuthsRepository } from "./auths.repository";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { CreateAuthDto } from "./dto/create-auth.dto";
import { GetAuthDto } from "./dto/get-auth.dto";
import { AuthSignIn } from "./interfaces/auth-signin.interface";
import { AuthToken } from "./interfaces/auth-token.interface";
import { JwtPayload } from "./interfaces/jwt-payload.interface";

@Injectable()
export class AuthsService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectConnection()
    private readonly connection: Connection,
    @InjectRepository(AuthsRepository)
    private readonly authsRepository: AuthsRepository,
    @InjectRepository(DevicesRepository)
    private readonly devicesRepository: DevicesRepository,
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
  ) {}

  async isExist(dto: GetAuthDto): Promise<IsExist> {
    const { platform_type, platform_key } = dto;
    const getAuthDto: GetAuthDto = { platform_type, platform_key };
    const found = await this.authsRepository.findOne(getAuthDto);
    const exist_yn = found ? "Y" : "N";
    return { exist_yn };
  }

  async signIn(dto: AuthCredentialsDto): Promise<AuthSignIn> {
    const runner = this.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const { platform_type, platform_key } = dto;
      const getAuthDto: GetAuthDto = { platform_type, platform_key };
      const found = await this.authsRepository.findOne(getAuthDto);
      if (!found) { throw new NotFoundException('가입 정보가 없습니다.'); }

      // 사용자 정보 갱신
      const { user_id } = found;
      const { email, birth_year, gender } = dto;
      const updateUserDto: UpdateUserDto = { email, birth_year, gender };
      const user = await this.usersRepository.upsert(user_id, updateUserDto);
      await runner.manager.save(user);

      const { uuid, model, os_name, os_version, app_version, message_token } = dto;
      const updateDeviceDto: UpdateDeviceDto = {
        model, os_name, os_version, app_version, message_token, user_id };
      const device = await this.devicesRepository.upsert(uuid, updateDeviceDto);
      await runner.manager.save(device);
      
      // 로그인 토큰 조회
      const token = await this.getAccessToken(user);

      await runner.commitTransaction();
      return { user: user, ...token };

    } catch (err) {
      await runner.rollbackTransaction();
      throw err;

    } finally {
      await runner.release();
    }
  }

  async signUp(dto: AuthCredentialsDto): Promise<AffectedRows> {
    const runner = this.connection.createQueryRunner();
    await runner.connect();
    await runner.startTransaction();
    try {
      const { platform_type, platform_key } = dto;
      const getAuthDto: GetAuthDto = { platform_type, platform_key };
      const found = await this.authsRepository.findOne(getAuthDto);
      if (found) { return { rows: 0 }; }

      // 데이터가 없을 시 추가
      const { email, birth_year, gender } = dto;
      const nickname = '테스트';
      const createUserDto: CreateUserDto = { nickname, email, birth_year, gender };
      const user = await this.usersRepository.create(createUserDto);
      await runner.manager.save(user);

      const { id: user_id } = user;
      const createAuthDto: CreateAuthDto = { platform_type, platform_key, user_id };
      const auth = await this.authsRepository.create(createAuthDto);
      await runner.manager.save(auth);

      const { uuid, model, os_name, os_version, app_version, message_token } = dto;
      const updateDeviceDto: UpdateDeviceDto = {
        model, os_name, os_version, app_version, message_token, user_id };
      const device = await this.devicesRepository.upsert(uuid, updateDeviceDto);
      await runner.manager.save(device);

      await runner.commitTransaction();
      return { rows: 1 };

    } catch (err) {
      await runner.rollbackTransaction();
      throw err;

    } finally {
      await runner.release();
    }
  }
  
  private async getAccessToken(user: UserEntity): Promise<AuthToken> {
    const payload: JwtPayload = { user_id: user.id };
    const access_token = await this.jwtService.sign(payload);
    return { access_token };
  }
}
