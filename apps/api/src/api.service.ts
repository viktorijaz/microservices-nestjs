import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserRequest } from './create-user-request.dto';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class ApiService {
  private readonly users: any[] = [];
  private readonly logger = new Logger(ApiService.name);

  constructor(
    @Inject('COMMUNICATION') private readonly communicationClient: ClientProxy,
    @Inject('ANALYTICS') private readonly analyticsClient: ClientProxy,
  ) { }

  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserRequest: CreateUserRequest) {
    this.users.push(createUserRequest);
    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.email),
    );
    this.logger.log(`before getCommunicator`);
    this.analyticsClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequest.email),
    );
  }

  getAnalytics() {
    this.logger.log(`before Analytics`);
    try {
      return this.analyticsClient.send({ cmd: 'get_analytics' }, {});
    } catch (e) {
      this.logger.log(`the error is`);
      this.logger.log(e);
    }
  }

  getCommunicator() {

  }
}
