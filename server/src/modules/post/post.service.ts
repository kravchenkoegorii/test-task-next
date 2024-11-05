import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Post, PostDocument } from '../../data-access/post.entity';
import { Model } from 'mongoose';
import { CreatePostDto } from '../../shared/dto/create-post.dto';
import { UpdatePostDto } from '../../shared/dto/update-post.dto';

@Injectable()
export class PostService {
  public constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
  ) {}

  public async createPost(createPostDto: CreatePostDto): Promise<Post> {
    const newPost = new this.postModel({
      ...createPostDto,
    });

    return await newPost.save();
  }

  public async getAllPosts(): Promise<Post[]> {
    return await this.postModel.find().exec();
  }

  public async getPostById(id: string): Promise<PostDocument> {
    const post = await this.postModel.findById(id).exec();

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
    const post = await this.postModel.findByIdAndDelete(id).exec();

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    return post;
  }

  public async addImageToPost(
    id: string,
    image: Buffer,
  ): Promise<PostDocument> {
    const updatedPost = await this.postModel
      .findByIdAndUpdate(id, { image }, { new: true })
      .exec();

    if (!updatedPost) {
      throw new NotFoundException('Post not found');
    }

    return updatedPost;
  }
}
