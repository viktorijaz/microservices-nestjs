import { Injectable, Logger } from '@nestjs/common';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class CommunicatorService {
  private readonly logger = new Logger(CommunicatorService.name);

  getHello(): string {
    return 'Hello World!';
  }

  handleUserCreated(data: CreateUserEvent) {
    this.logger.log('handlerUserCreated - COMMUNICATIONS', data);
    // TODO: Email the user...
  }
}


