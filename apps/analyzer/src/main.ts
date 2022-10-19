import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AnalyzerModule } from './analyzer.module';

async function bootstrap() {
  const app = await NestFactory.create(AnalyzerModule);

  const configService = new ConfigService();


  app.connectMicroservice({
    transport: Transport,
    options: {
      host: configService.get('ANALYZER_HOST'),
      port: configService.get('ANALYZER_PORT_TCP')
    },
  });
  await app.startAllMicroservices();
  await app.listen(configService.get('ANALYZER_PORT'));
}
bootstrap();
