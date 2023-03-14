import { Controller, Post, Body, Session } from '@nestjs/common';
import { UserService } from './user/user.service';
import { CreateUserDto } from './dto/create-user.dto/create-user.dto';
import { User } from './user.schema';
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  async login(@Body() body, @Session() session) {
    // ...
  }

  @Post('register')
  async register(@Body() body: CreateUserDto, @Session() session) {
    const { email, password } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ email, password: hashedPassword });

    session.userId = user._id;
    return { success: true };
  }
}
