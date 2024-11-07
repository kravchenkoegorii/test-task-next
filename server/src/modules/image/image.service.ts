import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image, ImageDocument } from '../../data-access/image.entity';

@Injectable()
export class ImageService {
  constructor(
    @InjectModel(Image.name) private imageModel: Model<ImageDocument>,
  ) {}

  async uploadImage(
    filename: string,
    buffer: Buffer,
    mimeType: string,
  ): Promise<ImageDocument> {
    const newImage = new this.imageModel({ filename, buffer, mimeType });
    return await newImage.save();
  }

  async getImageById(id: string): Promise<ImageDocument | null> {
    const image = await this.imageModel.findById(id).exec();

    if (!image) {
      throw new NotFoundException(`Image not found`);
    }

    return image;
  }

  async deleteImage(id: string): Promise<ImageDocument | null> {
    const image = await this.imageModel.findByIdAndDelete(id).exec();

    if (!image) {
      throw new NotFoundException('Image not found');
    }

    return image;
  }

  async bulkDeleteImages(ids: string[]): Promise<number> {
    const result = await this.imageModel
      .deleteMany({ _id: { $in: ids } })
      .exec();
    return result.deletedCount || 0;
  }
}
