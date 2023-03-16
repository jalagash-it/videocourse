import { Module } from '@nestjs/common';
import { ModuleModule } from './module/module.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user/user.entity';
import { UserService } from './user/user.service';
import { UserController } from './user/user.controller';

@Module({
  imports: [ModuleModule, TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
})
export class AuthModule {}
