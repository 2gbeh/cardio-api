import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import APP from 'src/constants/APP';

export function swgaggerConfig(app: INestApplication) {
  const BASE_PATH = process.env.NEST_API_BASE_PATH as string;

  return SwaggerModule.setup(
    `${BASE_PATH}/docs`,
    app,
    SwaggerModule.createDocument(
      app,
      new DocumentBuilder()
        .setTitle(APP.name)
        .setDescription(APP.summary)
        .setVersion(APP.version)
        .build(),
    ),
  );
}
