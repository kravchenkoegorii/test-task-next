import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class BulkDeleteBody {
  @ApiProperty()
  @IsArray()
  ids: string[];
}
