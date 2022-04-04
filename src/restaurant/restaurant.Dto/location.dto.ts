import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, Max, Min } from 'class-validator';

export class LocationDto {
  @ApiProperty()
  @Transform((value) => parseFloat(value.value))
  @IsNumber()
  @Min(-180)
  @Max(180)
  long: number;
  @ApiProperty()
  @Transform((value) => parseFloat(value.value))
  @IsNumber()
  @Min(-90)
  @Max(90)
  lat: number;
}
