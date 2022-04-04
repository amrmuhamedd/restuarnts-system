import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { RestaurantService } from './restaurants.service';

import { JwtAuthGuard } from 'src/users/guards/jwtauth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateResturantDto } from './restaurant.Dto/creatRestaurant.dto';
import { LoggedInUser } from 'src/shared/decorator/logged-in-user.decorator';
import { User } from 'src/users/model/users';
import { ResturantDetailsFilter } from './filters/resturantDetailedFilter.dto';
import { LocationDto } from './restaurant.Dto/location.dto';
import { AllRestaurantFilter } from './filters/filterAllRestaurant.dto';
import { UpdateResturantDto } from './restaurant.Dto/updateRestaurant.dto';

@ApiTags('Restaurants')
@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantService) {}
  @Get('getAll')
  getAll(@Query() filters: AllRestaurantFilter) {
    return this.restaurantsService.getAllRestaurant(filters);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Post()
  createResturant(
    @Body() resturant: CreateResturantDto,
    @LoggedInUser() user: User,
  ) {
    return this.restaurantsService.create(resturant, user.id);
  }

  @Get()
  getresturantById(@Query() filters: ResturantDetailsFilter) {
    return this.restaurantsService.getResturant(filters);
  }
  @Get('/nearst')
  getNearst(@Query() filters: LocationDto) {
    return this.restaurantsService.getNearsetResturant(filters);
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Put('/update/:id')
  upateResturant(
    @Param('id') id: string,
    @Body() resturant: UpdateResturantDto,
    @LoggedInUser() user: User,
  ) {
    return this.restaurantsService.update(id, resturant, user.id);
  }
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Delete('/delete/:id')
  delete(@Param('id') id: string, @LoggedInUser() user: User) {
    return this.restaurantsService.delete(id, user.id);
  }
}
