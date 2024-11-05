import {
  Body,
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Patch,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PostService } from './post.service';
import { FileInterceptor } from '@nestjs/platform-express';
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

  @Post(':id/image')
  @UseInterceptors(FileInterceptor('file'))
  @ApiOperation({ summary: 'Upload image for post' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'Image uploaded successfully' })
  @ApiResponse({ status: 404, description: 'Post not found' })
  async uploadImage(
    @Query('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })], // Max 10 MB
      }),
    )
    file: Express.Multer.File,
  ) {
    const bufferImage = file.buffer;
    const updatedPost = await this.postService.addImageToPost(id, bufferImage);
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
