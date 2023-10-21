import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(36)
  @MinLength(0)
  @ApiProperty()
  book_category_id: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  @ApiProperty()
  author: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  description: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  price: number;
}
