import {
  Controller,
  Request,
  Post,
  UseGuards,
  Body,
  Patch,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/localauth.guard';
import { CreateUserDto } from './dto/createuser.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { LoggedInUser } from 'src/shared/decorator/logged-in-user.decorator';
import { User } from './model/users';
import { JwtAuthGuard } from './guards/jwtauth.guard';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Body() doc: LoginDto) {
    return this.authService.login(req.user._doc);
  }
  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Patch('update')
  async update(@Body() userInfo: UpdateUserDto, @LoggedInUser() user: User) {
    return this.authService.updateUser(userInfo, user.id);
  }
}
