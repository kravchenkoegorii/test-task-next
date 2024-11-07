import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ collection: 'posts', timestamps: true })
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: 'Image', required: false })
  image: Types.ObjectId;

  @Prop({ required: true })
  description: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
