import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumberString,
  IsObject,
  IsString,
} from 'class-validator';
import { LocationDto } from './location.dto';
export class CreateResturantDto {
  @IsNotEmpty()
  @ApiProperty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  unique_name: string;
  @ApiProperty()
  @IsArray()
  cuisine: Array<string>;
  @ApiProperty()
  @IsObject()
  location: LocationDto;
}
