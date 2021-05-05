import {
  Controller,
  Post,
  UseGuards,
  Request,
  Res,
  Response,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import cookieParser from 'cookie-parser';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Res({ passthrough: true }) response, @Request() req) {
    const token = await this.authService.login(req.user);
    response.cookie('jwt', token.access_token, {
      expires: new Date(Date.now() + 24 * 3600000),
      signed: true,
      httpOnly: true,
      secure: process.env.HTTPS === 'true',
      sameSite: process.env.HTTPS === 'true' ? 'none' : 'lax',
    });
    return token;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Res({ passthrough: true }) response, @Request() req) {
    await response.clearCookie('jwt');
    await response.clearCookie('io');
    return;
  }
}
