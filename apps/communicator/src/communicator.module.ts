import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { CommunicatorController } from './communicator.controller';
import { CommunicatorService } from './communicator.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        COMMUNICATOR_PORT: Joi.number().required(),
        COMMUNICATOR_HOST: Joi.string().required(),
      }),
      envFilePath: './.env',
    }),
  ],
  controllers: [CommunicatorController],
  providers: [CommunicatorService],
})
export class CommunicatorModule { }
