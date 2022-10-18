import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiService } from './api.service';
import { CreateUserRequest } from './create-user-request.dto';

@Controller()
export class ApiController {
  constructor(private readonly apiService: ApiService) { }

  @Get()
  getHello(): string {
    return this.apiService.getHello();
  }

  @Post()
  createUser(@Body() createUserRequest: CreateUserRequest) {
    this.apiService.createUser(createUserRequest);
  }

  @Get('analytics')
  getAnalytics() {
    return this.apiService.getAnalytics();
  }

  @Get('communicator')
  getCommunicator() {
    return this.apiService.getCommunicator();
  }
}







