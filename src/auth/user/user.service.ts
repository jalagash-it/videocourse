import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { create } from 'domain';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dto/create-user.dto/create-user.dto';
import { User } from './schema/user.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email });
  }

  async findById(id: string): Promise<User | null> {
    return this.userModel.findById(id).exec();
  }

  async create(data: CreateUserDto, email: string, password: string, user: User, createUserDto: CreateUserDto): Promise<User> {
    const Createduser = new this.userModel(data, { 
      email: createUserDto.email, 
      password: await bcrypt.hash(createUserDto.password, 10)}, user);


  return Createduser.save();

  }

}
