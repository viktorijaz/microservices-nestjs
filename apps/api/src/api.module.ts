import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        COMMUNICATOR_PORT: Joi.number().required(),
        COMMUNICATOR_HOST: Joi.string().required(),
        ANALYZER_PORT_TCP: Joi.number().required(),
        ANALYZER_HOST: Joi.string().required(),
      }),
      envFilePath: './.env',
    }),
    ClientsModule.registerAsync([
      {
        name: 'COMMUNICATION',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: configService.get<number>('COMMUNICATOR_PORT'),
            host: configService.get<string>('COMMUNICATOR_HOST')
          }
        }
        ),
        inject: [ConfigService],
      },
      {
        name: 'ANALYTICS',
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            port: configService.get<number>('ANALYZER_PORT_TCP'),
            host: configService.get<string>('ANALYZER_HOST')
          }
        }
        ),
        inject: [ConfigService],
      },
    ])
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule { }


