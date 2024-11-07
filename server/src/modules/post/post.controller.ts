import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';
import { CreatePostDto } from '../../shared/dto/create-post.dto';
import { UpdatePostDto } from '../../shared/dto/update-post.dto';

@ApiTags('posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new post' })
  @ApiBody({
    type: CreatePostDto,
  })
  @ApiResponse({ status: 201, description: 'Post created successfully' })
  @ApiResponse({ status: 400, description: 'Validation failed' })
  async createPost(@Body() createPostDto: CreatePostDto) {
    return await this.postService.createPost(createPostDto);
  }

  @Get()
  @ApiOperation({ summary: 'Fetch all posts' })
  @ApiResponse({ status: 200, description: 'Fetched all posts' })
  async getAllPosts() {
    return await this.postService.getAllPosts();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Fetch the post by id' })
  @ApiResponse({ status: 200, description: 'Fetched post by id' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async getPostById(@Param('id') id: string) {
    return await this.postService.getPostById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update the post by id' })
  @ApiBody({
    type: UpdatePostDto,
  })
  @ApiResponse({ status: 200, description: 'Post updated successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async updatePost(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return await this.postService.updatePost(id, updatePostDto);
  }

  @Patch(':id/image')
  @ApiOperation({ summary: 'Set image to post' })
  @ApiResponse({ status: 200, description: 'Image set successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async setImageToPost(
    @Query('id') id: string,
    @Param('imageId') image: string,
  ) {
    const updatedPost = await this.postService.addImageToPost(id, image);
    return { success: !!updatedPost };
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete post by id' })
  @ApiResponse({ status: 200, description: 'Post deleted successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async deletePost(@Param('id') id: string) {
    const result = await this.postService.deletePost(id);
    return { success: !!result };
  }
}
