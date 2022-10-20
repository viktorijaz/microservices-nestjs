import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import * as Joi from 'joi';
import PostsController from './posts.controller';
import PostsService from './posts.service';
import Post from './post.entity';
import { DatabaseModule } from '@app/common';


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
    ]),
    DatabaseModule,
    TypeOrmModule.forFeature([Post]),
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule { }
