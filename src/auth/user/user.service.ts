import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto/create-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async create(data: CreateUserDto, email: string, password: string): Promise<User> {
    const user = new this.userModel(data, { email, password });
    return user.save();
  }
  
}
