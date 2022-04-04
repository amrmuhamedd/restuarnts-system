import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class Location {
  @Prop({ type: String, default: 'Point' })
  type: string;

  @Prop({ type: [Number], index: '2dsphere' })
  coordinates: Array<number>;
}
