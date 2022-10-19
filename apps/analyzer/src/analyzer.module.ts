import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { AnalyzerController } from './analyzer.controller';
import { AnalyzerService } from './analyzer.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        ANALYZER_PORT: Joi.number().required(),
        ANALYZER_PORT_TCP: Joi.number().required(),
        ANALYZER_HOST: Joi.string().required(),
      }),
      envFilePath: './.env',
    }),
  ],
  controllers: [AnalyzerController],
  providers: [AnalyzerService],
})
export class AnalyzerModule { }
