import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { CoursesModule } from './courses/courses.module';
import { User, UserSchema } from './auth/user/schema/user.schema';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/video_course_platform'),
    AuthModule,
    CoursesModule,
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])
  ],
  exports: [MongooseModule]
})
export class AppModule {}
export class DatabaseModule {}
