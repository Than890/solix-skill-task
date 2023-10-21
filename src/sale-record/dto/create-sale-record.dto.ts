import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateSaleRecordDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(36)
  @MinLength(0)
  @ApiProperty()
  sale_id: string;

  @IsOptional()
  @IsString()
  @MaxLength(36)
  @MinLength(0)
  @ApiProperty()
  customer_id: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @ApiProperty()
  customer_name: string;

  @IsOptional()
  @Transform(({ value }) => value.replace('+959', '09'))
  @IsString()
  @IsPhoneNumber('MM')
  @MaxLength(13)
  @MinLength(9)
  @ApiProperty()
  customer_phone: string;

  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  paid_amount: number;

  @IsOptional()
  @IsString()
  @MaxLength(36)
  @MinLength(0)
  @ApiProperty()
  user_id: string;
}
