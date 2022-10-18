import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AnalyzerModule } from './analyzer.module';

async function bootstrap() {
  const app = await NestFactory.create(AnalyzerModule);
  const myMicro = app.connectMicroservice({
    transport: Transport,
    options: {
      host: 'analyzer',
      port: 5000
    },
  });
  await app.startAllMicroservices();
  await app.listen(3001);
  await myMicro.listen();
}
bootstrap();
