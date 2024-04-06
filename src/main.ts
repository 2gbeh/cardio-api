import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { swgaggerConfig } from './configs/swagger/swagger.config';

async function bootstrap() {
  const [BASE_PATH, PORT] = [
    process.env.NEST_API_BASE_PATH as string,
    (process.env.NEST_API_PORT as string) ?? 3000,
  ];

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(BASE_PATH, { exclude: [] });

  // 3RD PARTY
  swgaggerConfig(app);

  //
  await app.listen(PORT);
}

bootstrap();
