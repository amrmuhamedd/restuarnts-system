import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateResturantDto {
  @ApiProperty()
  @IsString()
  cuisine: string;
}
