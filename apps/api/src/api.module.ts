import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ApiController } from './api.controller';
import { ApiService } from './api.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'COMMUNICATION',
        transport: Transport.TCP,
        options: { port: 3002 },
      },
      {
        name: 'ANALYTICS',
        transport: Transport.TCP,
        options: {
          host: 'analyzer', port: 5000
        },
      },
    ]),
  ],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule { }


