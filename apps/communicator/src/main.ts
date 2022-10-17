import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CommunicatorModule } from './communicator.module';

async function bootstrap() {

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CommunicatorModule,
    {
      transport: Transport.TCP,
    },
  );
  app.listen();
}
bootstrap();


