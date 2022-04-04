import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UsersDocumenet } from './model/users';
import { CreateUserDto } from './dto/createuser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UsersDocumenet>,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const name = await this.userModel.findOne({ username: username }).exec();
    const email = await this.userModel.findOne({ email: username }).exec();
    const user = name || email;
    if (!user) {
      throw new HttpException(
        {
          status: HttpStatus.NOT_FOUND,
          error: "we didn't find this user",
        },
        HttpStatus.NOT_FOUND,
      );
    }
    const isMatch = await bcrypt.compare(pass, user.password);
    if (user && isMatch) {
      const { password, ...result } = user;
      return { ...result };
    }
    return null;
  }

  async login(user: any) {
    if (user) {
      const payload = {
        username: user.username,
        roles: user.roles,
        id: user._id,
      };
      return {
        access_token: this.jwtService.sign(payload),
      };
    }
    return null;
  }

  async updateUser(user: UpdateUserDto, userId) {
    await this.userModel.findByIdAndUpdate(userId, user);
    return await this.userModel.findById(userId).select('-password');
  }
  async register(createUeserdto: CreateUserDto) {
    const username = await this.userModel.findOne({
      username: createUeserdto.username,
    });
    const email = await this.userModel.findOne({
      username: createUeserdto.email,
    });
    if (username || email) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'user already exist with same username or email',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
    const saltOrRounds = 12;
    const password = createUeserdto.password;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    try {
      const createdUser = new this.userModel({
        username: createUeserdto.username,
        email: createUeserdto.email,
        password: hashedPassword,
      });
      await createdUser.save();
      const tokenPayload = {
        username: createdUser.username,
        email: createdUser.email,
        id: createdUser._id,
      };
      return {
        access_token: this.jwtService.sign(tokenPayload),
      };
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          status: HttpStatus.CONFLICT,
          error: 'some thing went wrong please try again later',
        },
        HttpStatus.CONFLICT,
      );
    }
  }
}
