import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
export type UsersDocumenet = User & Document;

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
