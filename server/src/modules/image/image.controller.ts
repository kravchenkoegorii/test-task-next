import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  Param,
  Get,
  Delete,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import {
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('images')
@Controller('images')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
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
  @ApiResponse({ status: 201, description: 'Image uploaded successfully' })
  @ApiResponse({ status: 400, description: 'Validation error' })
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 })], // Max 10 MB
      }),
    )
    file: Express.Multer.File,
  ) {
    const { originalname, buffer, mimetype } = file;
    const image = await this.imageService.uploadImage(
      originalname,
      buffer,
      mimetype,
    );
    return image._id;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get image by ID' })
  @ApiResponse({ status: 200, description: 'Image retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  async getImageById(@Param('id') id: string) {
    return await this.imageService.getImageById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete image by ID' })
  @ApiResponse({ status: 200, description: 'Image deleted successfully' })
  @ApiResponse({ status: 404, description: 'Image not found' })
  async deleteImage(@Param('id') id: string) {
    const result = await this.imageService.deleteImage(id);
    return { success: !!result };
  }
}
