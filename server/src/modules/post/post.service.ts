import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../../data-access/post.entity';
import { Model } from 'mongoose';
import { CreatePostDto } from '../../shared/dto/create-post.dto';
import { UpdatePostDto } from '../../shared/dto/update-post.dto';
import { ImageService } from '../image/image.service';
import { PaginationResponse } from '../../shared/dto/pagination.response';
import { BulkDeleteBody } from '../../shared/dto/bulk-delete.body';

@Injectable()
export class PostService {
  public constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private readonly imageService: ImageService,
  ) {}

  public async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = new this.postModel({
      ...createPostDto,
    });

    return await newPost.save();
  }

  public async getAllPosts(
    page: number,
    limit: number,
  ): Promise<PaginationResponse | Post[]> {
    if (page && limit) {
      const skip = (page - 1) * limit;
      const posts = await this.postModel
        .find()
        .skip(skip)
        .limit(limit)
        .populate('image')
        .exec();
      const total = await this.postModel.countDocuments();

      return {
        data: posts,
        total,
        currentPage: page,
        totalPages: Math.ceil(total / limit),
      };
    } else {
      const posts = await this.postModel.find().exec();

      return posts;
    }
  }

  public async getPostById(id: string): Promise<PostDocument> {
    const post = await this.postModel.findById(id).populate('image').exec();

    if (!post) {
      throw new NotFoundException(`Post not found`);
    }

    return post;
  }

  public async updatePost(
    id: string,
    updatePostDto: UpdatePostDto,
  ): Promise<PostDocument | null> {
    const updatedPost = await this.postModel
      .findByIdAndUpdate(id, updatePostDto, { new: true })
      .exec();

    if (!updatedPost) {
      throw new NotFoundException('Post not found');
    }

    return updatedPost;
  }

  public async deletePost(id: string): Promise<PostDocument | null> {
    const post = await this.postModel.findById(id).populate('image').exec();

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    if (post.image) {
      await this.imageService.deleteImage(post?.image?._id.toString());
    }

    await this.postModel.deleteOne({ _id: id }).exec();

    return post;
  }

  public async addImageToPost(
    id: string,
    image: string,
  ): Promise<PostDocument> {
    const updatedPost = await this.postModel
      .findByIdAndUpdate(id, { image }, { new: true })
      .exec();

    if (!updatedPost) {
      throw new NotFoundException('Post not found');
    }

    return updatedPost;
  }

  public async bulkDeletePosts(body: BulkDeleteBody): Promise<number> {
    const posts = await this.postModel
      .find({ _id: { $in: body.ids } })
      .populate('image')
      .exec();

    const imageIds = posts.map((post) => post.image._id);

    if (imageIds.length > 0) {
      await this.imageService.bulkDeleteImages(
        imageIds.map((id) => id.toString()),
      );
    }

    const result = await this.postModel
      .deleteMany({ _id: { $in: body.ids } })
      .exec();

    return result.deletedCount || 0;
  }

  public async bulkUpdatePosts(
    updates: { id: string; updateData: Partial<UpdatePostDto> }[],
  ): Promise<number> {
    let updateCount = 0;
    for (const { id, updateData } of updates) {
      const updatedPost = await this.postModel
        .findByIdAndUpdate(id, updateData, { new: true })
        .exec();
      if (updatedPost) {
        updateCount++;
      }
    }
    return updateCount;
  }
}
