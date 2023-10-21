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
import { CreateSaleDto } from './dto/create-sale.dto';
import { SaleService } from './sale.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('sales')
@ApiTags('Sale')
export class SaleController {
  constructor(private saleService: SaleService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('success')
  async GetAllByFilter(@Query() query: any) {
    return this.saleService.getAllByFilter(query);
  }

  @Get('/pages')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('success')
  async GetByPagination(@Query() query: PaginationQuery) {
    return this.saleService.getByPagination(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('success')
  async GetOne(@Param('id') id: string) {
    return this.saleService.getOneById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @UsePipes(ValidationPipe)
  @ResponseMessage('New Sale has been successfully created.')
  async create(@Body() sale: CreateSaleDto) {
    return this.saleService.create(sale);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('A Sale has been permanently deleted.')
  async delete(@Param('id') id: string) {
    return this.saleService.delete(id);
  }
}
