import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
      validationSchema: Joi.object({
        NEST_API_PORT: Joi.number().required(),
        NEST_API_URL: Joi.required(),
        NEST_API_VERSION: Joi.number().required(),
        NEST_API_BASE_PATH: Joi.required(),
      }),
    }),
  ],
})
export class EnvModule {}
