import { Module } from '@nestjs/common';
import { CommunicatorController } from './communicator.controller';
import { CommunicatorService } from './communicator.service';

@Module({
  imports: [],
  controllers: [CommunicatorController],
  providers: [CommunicatorService],
})
export class CommunicatorModule {}
