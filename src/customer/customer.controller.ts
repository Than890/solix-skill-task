import {
  Controller,
  Get,
  Post,
  Delete,
  Patch,
  Body,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ResponseMessage } from 'src/config/handlers/response-message';
import { PaginationQuery } from 'src/config/interfaces/request-query';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerService } from './customer.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('customers')
@ApiTags('Customer')
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('success')
  async GetAllByFilter(@Query() query: any) {
    return this.customerService.getAllByFilter(query);
  }

  @Get('/pages')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('success')
  async GetByPagination(@Query() query: PaginationQuery) {
    return this.customerService.getByPagination(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('success')
  async GetOne(@Param('id') id: string) {
    return this.customerService.getOneById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @UsePipes(ValidationPipe)
  @ResponseMessage('New Customer has been successfully created.')
  async create(@Body() customer: CreateCustomerDto) {
    return this.customerService.create(customer);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @UsePipes(ValidationPipe)
  @ResponseMessage('A Customer has been successfully updated.')
  async update(@Param('id') id: string, @Body() customer: UpdateCustomerDto) {
    return this.customerService.update(id, customer);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('A Customer has been permanently deleted.')
  async delete(@Param('id') id: string) {
    return this.customerService.delete(id);
  }
}
