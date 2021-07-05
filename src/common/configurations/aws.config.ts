import { INestApplication } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { config } from "aws-sdk";

export function initAws(app: INestApplication): void {
  const configService = app.get(ConfigService);
  config.update({
    accessKeyId: configService.get<string>('S3_KEY'),
    secretAccessKey: configService.get<string>('S3_SECRET'),
    region: configService.get<string>('S3_REGION'),
  })
}
