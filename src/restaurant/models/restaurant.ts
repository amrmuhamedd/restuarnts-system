import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Types } from 'mongoose';
import { User } from 'src/users/model/users';
import { Location } from '../../shared/Model/location';
export type RestaurantDocumenet = Restaurant & Document;

@Schema({
  timestamps: true,
})
export class Restaurant {
  @Prop({ required: true, type: Types.ObjectId || Object, ref: 'User' })
  userId: User;
  @Prop()
  name: string;
  @Prop({ type: String, unique: true })
  unique_name: string;
  @Prop({ type: Array })
  cuisine: Array<string>;
  @Prop({ index: '2dsphere' })
  location: Location;
}

export const RestaurantSchema = SchemaFactory.createForClass(Restaurant);
