import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CreateCustomerDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  @MinLength(3)
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @Transform(({ value }) => value.replace('+959', '09'))
  @IsString()
  @IsPhoneNumber('MM')
  @MaxLength(13)
  @MinLength(9)
  @ApiProperty()
  phone: string;

  @IsOptional()
  @IsString()
  @IsEmail()
  @MaxLength(100)
  @MinLength(3)
  @ApiProperty()
  email: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  address: string;
}
