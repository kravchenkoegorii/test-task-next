import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ collection: 'posts', timestamps: true })
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Buffer, required: false })
  image: Buffer;

  @Prop({ required: true })
  description: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
