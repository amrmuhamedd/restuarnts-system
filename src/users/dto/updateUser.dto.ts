import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @ApiProperty()
  @IsOptional()
  full_name: string;

  @IsArray()
  @ApiProperty()
  @IsOptional()
  favorite_cuisine: Array<string>;
  _id;
}
