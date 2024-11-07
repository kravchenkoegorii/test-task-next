import { HydratedDocument } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ImageDocument = HydratedDocument<Image>;

@Schema({ collection: 'images', timestamps: true })
export class Image {
  @Prop({ required: true })
  filename: string;

  @Prop({ type: Buffer, required: true })
  buffer: Buffer;

  @Prop({ required: true })
  mimeType: string;
}

export const ImageSchema = SchemaFactory.createForClass(Image);
