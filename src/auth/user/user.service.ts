import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto/create-user.dto';
import { User } from './schema/user.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async create(data: CreateUserDto, email: string, password: string, user: User): Promise<User> {
    const Createduser = new this.userModel(data, { email, password }, user);

  return Createduser.save();

  }

}
