import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from '../../data-access/post.entity';
import { PostService } from './post.service';
import { PostController } from './post.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  providers: [PostService],
  controllers: [PostController],
  exports: [],
})
export class PostModule {}
