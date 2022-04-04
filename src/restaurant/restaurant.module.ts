import { Module } from '@nestjs/common';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { RestaurantsController } from './restaurant.controller';
import { RestaurantService } from './restaurants.service';
import { Restaurant, RestaurantSchema } from './models/restaurant';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Restaurant.name, schema: RestaurantSchema },
    ]),
  ],
  controllers: [RestaurantsController],
  providers: [RestaurantService],
})
export class ResturantModule {}
