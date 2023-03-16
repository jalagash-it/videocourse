import { Controller, Post, Body, Session, Injectable, UnauthorizedException, Request, UseGuards  } from '@nestjs/common';
import { UserService } from './user/user.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { User } from './user/schema/user.schema';
import * as bcrypt from 'bcrypt';
import { AuthGuard, PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
}


@Controller('auth')
export class AuthController {
  AuthService: any;
  constructor() {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(@Request() req) {
      return this.AuthService.login(req.user);
    }

  // @Post('login')
  // async login(@Body() body: CreateUserDto, @Session() session) {
  //   const {email, password} = body;
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   const UserEmail = email;
  //   if (hashedPassword == password || email === UserEmail){
  //     return "succesfully logined";
  //   } else {
  //     throw new Error("incorrect password or email");
  //   }
  // }

  @Post('register')
  async register(@Body() body: CreateUserDto, @Session() session) {
    const { email, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword });

    session.userId = user._id;
    return { success: true };
  }
}
