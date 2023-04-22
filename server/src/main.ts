import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);
  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle("SuperTonic API")
    .setDescription("SuperTonic API")
    .setVersion("1.0")
    .build();
  const document = SwaggerModule.createDocument(app, config, {
    ignoreGlobalPrefix: true,
  });

  SwaggerModule.setup("api", app, document);

  const port = configService.get("PORT") ?? 9999;
  await app.listen(port);
  console.log(`SuperTonic server on port ${port}`);
}
bootstrap();
