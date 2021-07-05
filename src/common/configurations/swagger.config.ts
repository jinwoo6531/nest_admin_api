import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export function initSwagger(app: INestApplication): void {
  const title = '플로잉 API 문서';
  const config = new DocumentBuilder()
    .setTitle(title)
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('상품')
    .addTag('가입')
    .addTag('사용자')
    .addTag('테스트', '개발 편의를 위한 통신, 실 서비스에 적용하지 말 것')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: title,
  });
}
