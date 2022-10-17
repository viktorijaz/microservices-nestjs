import { Controller, Get } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { AnalyzerService } from './analyzer.service';
import { CreateUserEvent } from './create-user.event';

@Controller()
export class AnalyzerController {
  constructor(private readonly analyzerService: AnalyzerService) { }

  @Get()
  getHello(): string {
    return this.analyzerService.getHello();
  }

  @EventPattern('user_created')
  handleUserCreated(data: CreateUserEvent) {
    this.analyzerService.handleUserCreated(data);
  }

  @MessagePattern({ cmd: 'get_analytics' })
  getAnalytics() {
    return this.analyzerService.getAnalytics();
  }
}



