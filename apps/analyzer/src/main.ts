import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AnalyzerModule } from './analyzer.module';

async function bootstrap() {
  const app = await NestFactory.create(AnalyzerModule);
  app.connectMicroservice({
    transport: Transport,
    options: {
      port: 3001,
    },
  });
  await app.startAllMicroservices();
  await app.listen(3001);
}
bootstrap();
