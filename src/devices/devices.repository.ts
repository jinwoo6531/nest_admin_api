import { EntityRepository, Repository } from "typeorm";
import { UpdateDeviceDto } from "./dto/update-device.dto";
import { DeviceEntity } from "./entities/device.entity";

@EntityRepository(DeviceEntity)
export class DevicesRepository extends Repository<DeviceEntity> {
  async upsert(uuid: string, dto: UpdateDeviceDto) {
    const device = await this.findOne(uuid);
    if (!device) return await this.create({ uuid, ...dto });
    
    device.model = dto.model;
    device.os_name = dto.os_name;
    device.os_version = dto.os_version;
    device.app_version = dto.app_version;
    device.message_token = dto.message_token;
    device.user_id = dto.user_id;
    return device;
  }
}
