import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  Scope,
} from '@nestjs/common';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';

import { Model } from 'mongoose';
import { Restaurant, RestaurantDocumenet } from './models/restaurant';
import { CreateResturantDto } from './restaurant.Dto/creatRestaurant.dto';
import { AllRestaurantFilter } from './filters/filterAllRestaurant.dto';
import { LocationDto } from './restaurant.Dto/location.dto';
import { ResturantDetailsFilter } from './filters/resturantDetailedFilter.dto';
import { UpdateResturantDto } from './restaurant.Dto/updateRestaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private RestaurantModel: Model<RestaurantDocumenet>,
  ) {}

  async create(restaurant: CreateResturantDto, userId) {
    const isExist = await this.RestaurantModel.findOne({
      unique_name: restaurant.unique_name,
    });
    if (isExist) {
      throw new BadRequestException({
        status: '400',
        message: 'unique_name is exist please try another name',
      });
    }
    return await this.RestaurantModel.create({
      ...restaurant,
      userId: userId,
      location: {
        coordinates: [restaurant.location.long, restaurant.location.lat],
      },
    });
  }

  async update(id: string, resturantInfo: UpdateResturantDto, userId) {
    const restaurant = await this.RestaurantModel.find({ userId, _id: id });
    if (!restaurant) {
      throw new NotFoundException({
        status: '404',
        message: "we can't find resturant with provided id",
      });
    }
    try {
      await this.RestaurantModel.findByIdAndUpdate(id, resturantInfo);
      return await this.RestaurantModel.findById(id);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async delete(id: string, userId) {
    const restaurant = await this.RestaurantModel.find({ userId, _id: id });
    if (!restaurant) {
      throw new NotFoundException({
        status: '404',
        message: "we can't find resturant with provided id",
      });
    }
    try {
      await this.RestaurantModel.findByIdAndDelete(id);
      return await this.RestaurantModel.findByIdAndDelete(id);
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async getAllRestaurant(filters: AllRestaurantFilter) {
    return await this.RestaurantModel.find(filters);
  }

  async getResturant(filters: ResturantDetailsFilter) {
    const isExist = await this.RestaurantModel.findOne({
      ...filters,
    });
    if (!isExist) {
      throw new BadRequestException({
        status: '400',
        message: 'there is no resturant with provided info',
      });
    }
    if (filters._id || filters.unique_name) {
      return await this.RestaurantModel.findOne({
        ...filters,
      });
    } else {
      throw new NotFoundException({
        status: '400',
        message: 'you should send id or unique_name',
      });
    }
  }

  async getNearsetResturant(filters: LocationDto) {
    const restaurants = await this.RestaurantModel.find({
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [filters.long, filters.lat],
          },
          $minDistance: 0,
          $maxDistance: 1000,
        },
      },
    });

    return restaurants;
  }
}
