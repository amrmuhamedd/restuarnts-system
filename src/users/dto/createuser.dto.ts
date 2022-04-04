import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  NotContains,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @ApiProperty()
  @NotContains(' ', { message: "user name shouldn't countain white spaces" })
  username: string;
  @IsString()
  @ApiProperty()
  full_name: string;

  @IsArray()
  @ApiProperty()
  favorite_cuisine: Array<string>;

  @IsEmail()
  @ApiProperty()
  email: string;

  @Length(6, 20)
  @ApiProperty()
  password: string;

  _id;
}
