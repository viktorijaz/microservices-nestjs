
import { Injectable, Logger } from '@nestjs/common';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AnalyzerService {
  private readonly logger = new Logger(AnalyzerService.name);

  private readonly analytics: any[] = [];
  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(data: CreateUserEvent) {
    this.logger.log('handlerUserCreated - ANALYTICS', data);
    this.analytics.push({
      email: data.email,
      timestamp: new Date(),
    });
  }

  getAnalytics() {
    this.logger.log('getAnalytics - ANALYTICS');
    return this.analytics;
  }
}



