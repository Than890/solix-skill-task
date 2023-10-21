import {
  Controller,
  Get,
  Post,
  Delete,
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
import { CreateSaleRecordDto } from './dto/create-sale-record.dto';
import { SaleRecordService } from './sale-record.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('sale-records')
@ApiTags('Sale Record')
export class SaleRecordController {
  constructor(private saleRecordService: SaleRecordService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('success')
  async GetAllByFilter(@Query() query: any) {
    return this.saleRecordService.getAllByFilter(query);
  }

  @Get('/pages')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('success')
  async GetByPagination(@Query() query: PaginationQuery) {
    return this.saleRecordService.getByPagination(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('success')
  async GetOne(@Param('id') id: string) {
    return this.saleRecordService.getOneById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @UsePipes(ValidationPipe)
  @ResponseMessage('New Sale Record has been successfully created.')
  async create(@Body() saleRecord: CreateSaleRecordDto) {
    return this.saleRecordService.create(saleRecord);
  }
}
