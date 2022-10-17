import { Controller, Get } from '@nestjs/common';
import { EventPattern } from '@nestjs/microservices';
import { CreateUserEvent } from './create-user.event';
import { CommunicatorService } from './communicator.service';

@Controller()
export class CommunicatorController {
  constructor(private readonly communicatorService: CommunicatorService) { }

  @Get()
  getHello(): string {
    return this.communicatorService.getHello();
  }

  @EventPattern('user_created')
  handleUserCreated(data: CreateUserEvent) {
    this.communicatorService.handleUserCreated(data);
  }
}


