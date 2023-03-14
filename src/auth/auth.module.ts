import { Module } from '@nestjs/common';
import { ModuleModule } from './module/module.module';
import { UserService } from './user/user.service';

@Module({
  imports: [ModuleModule],
  providers: [UserService]
})
export class AuthModule {}
