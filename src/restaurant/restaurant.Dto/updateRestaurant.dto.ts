import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { LocationDto } from './location.dto';
export class UpdateResturantDto {
  @IsNotEmpty()
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty({ required: false })
  @IsArray()
  @IsOptional()
  cuisine: Array<string>;
  @ApiProperty({ required: false })
  @IsObject()
  @IsOptional()
  location: LocationDto;
}
