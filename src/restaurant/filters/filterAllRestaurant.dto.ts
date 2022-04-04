import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class AllRestaurantFilter {
  @ApiProperty({ required: false })
  @IsOptional()
  cuisine: string;
}
