import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly config: ConfigService) {}
  
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: this.config.get<string>('DB_HOST', 'localhost'),
      port: this.config.get<number>('DB_PORT', 3306),
      database: this.config.get<string>('DB_SCHEMA'),
      username: this.config.get<string>('DB_USER'),
      password: this.config.get<string>('DB_PASS'),
      entities: ["dist/**/**/*.entity{.ts,.js}"],
      // logging: this.config.get<string>('DB_LOG') == 'true',
      synchronize: this.config.get<string>('DB_SYNC') == 'true',
    }
  }
}
