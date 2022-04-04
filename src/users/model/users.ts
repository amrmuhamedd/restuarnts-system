import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as mongoose from 'mongoose';
import { Location } from 'src/shared/Model/location';
import { CreateResturantDto } from 'src/restaurant/restaurant.Dto/creatRestaurant.dto';
export type UsersDocumenet = User & Document;
// import { Products } from 'src/products/models/products';

@Schema({
  timestamps: true,
  _id: true,
})
export class User {
  id;
  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ type: String })
  full_name: string;

  @Prop({ type: Array })
  favorite_cuisine: Array<string>;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
