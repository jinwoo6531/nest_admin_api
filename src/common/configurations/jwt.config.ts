import { Injectable } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { JwtModuleOptions, JwtOptionsFactory } from "@nestjs/jwt"

@Injectable()
export class JwtConfigService implements JwtOptionsFactory  {
  constructor(private readonly config: ConfigService) {}
  
  createJwtOptions(): JwtModuleOptions {
    return {
      secret: this.config.get<string>('JWT_SECRET'),
    }
  }
}
