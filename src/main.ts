import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const [BASE_PATH, PORT] = [
  process.env.NEST_API_BASE_PATH as string,
  (process.env.NEST_API_PORT as string) ?? 3000,
];

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix(BASE_PATH, { exclude: [] });
  //
  await app.listen(PORT);
}
bootstrap();
