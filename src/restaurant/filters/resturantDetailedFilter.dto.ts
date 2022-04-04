import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class ResturantDetailsFilter {
  @ApiProperty({ required: false })
  @IsOptional()
  _id: string;

  @ApiProperty({ required: false })
  unique_name: string;
}
