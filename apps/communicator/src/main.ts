import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { CommunicatorModule } from './communicator.module';


async function bootstrap() {

  const configService = new ConfigService();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    CommunicatorModule,
    {
      transport: Transport.TCP,
      options: {
        host: configService.get('COMMUNICATOR_HOST'),
        port: configService.get('COMMUNICATOR_PORT')
      },
    },
  );


  await app.listen();
}
bootstrap();


