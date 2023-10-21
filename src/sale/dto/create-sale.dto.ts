import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

enum DiscountType {
  No = 'no',
  Percent = 'percent',
  Amount = 'amount',
}

export class BookDetail {
  @IsNotEmpty()
  @IsString()
  @MaxLength(36)
  @MinLength(0)
  @ApiProperty()
  book_id: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  qty: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @IsString()
  @IsEnum(DiscountType)
  @ApiProperty()
  discount_type: DiscountType;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  discount: number;
}

export class CreateSaleDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(36)
  @MinLength(0)
  @ApiProperty()
  customer_id: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  total_discount: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  total_amount: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  paid_amount: number;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  due_amount: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(36)
  @MinLength(0)
  @ApiProperty()
  user_id: string;

  @ApiProperty({ type: [BookDetail] })
  book_detail: BookDetail[];
}
