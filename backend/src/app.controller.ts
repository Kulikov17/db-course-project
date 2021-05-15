import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { CurrentUser } from './auth/current-user.decorator';
import { AuthService } from './auth/auth.service';
import { UsersService, User } from './users/users.service';

@Controller()
export class AppController {
  constructor(private authService: AuthService,
    private usersService: UsersService) {}

  @UseGuards(LocalAuthGuard)
  @Post('/auth')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/test')
  test(@Request() req) {
    console.log(req);
    return req.user;
  }
}