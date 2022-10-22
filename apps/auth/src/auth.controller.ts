import { Body, Req, Controller, HttpCode, Post, UseGuards, Res, Get, Logger } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';
import RegisterDto from './dto/register.dto';
import RequestWithUser from './requestWithUser.interface';
import { LocalAuthenticationGuard } from './localAuthentication.guard';
import JwtAuthenticationGuard from './jwt-authentication.guard';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);
  constructor(
    private readonly authService: AuthService
  ) { }

  @Post('register')
  async register(@Body() registrationData: RegisterDto) {
    return this.authService.register(registrationData);
  }

  @HttpCode(200)
  @UseGuards(LocalAuthenticationGuard)
  @Post('log-in')
  async logIn(@Req() request: RequestWithUser, @Res() response: Response) {
    const { user } = request;
    const token = this.authService.getTokenBearer(user.id);
    user.password = undefined;
    return response.send({ ...user, ...token });
  }

  @UseGuards(JwtAuthenticationGuard)
  @Post('log-out')
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    return response.sendStatus(200);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  authenticate(@Req() request: RequestWithUser) {
    this.logger.log(`GET ROUTE auth controller, RequestWithUser object `, request.user);
    const user = request.user;
    user.password = undefined;
    return user;
  }
}
