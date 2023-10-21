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
import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';
import { BookCategoryService } from './book-category.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('book-categories')
@ApiTags('Book Category')
export class BookCategoryController {
  constructor(private bookCategoryService: BookCategoryService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('success')
  async GetAllByFilter(@Query() query: any) {
    return this.bookCategoryService.getAllByFilter(query);
  }

  @Get('/pages')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('success')
  async GetByPagination(@Query() query: PaginationQuery) {
    return this.bookCategoryService.getByPagination(query);
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('success')
  async GetOne(@Param('id') id: string) {
    return this.bookCategoryService.getOneById(id);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @UsePipes(ValidationPipe)
  @ResponseMessage('New Book Category has been successfully created.')
  async create(@Body() bookCategory: CreateBookCategoryDto) {
    return this.bookCategoryService.create(bookCategory);
  }

  @Patch(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @UsePipes(ValidationPipe)
  @ResponseMessage('A Book Category has been successfully updated.')
  async update(
    @Param('id') id: string,
    @Body() bookCategory: UpdateBookCategoryDto,
  ) {
    return this.bookCategoryService.update(id, bookCategory);
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth('JWT-auth')
  @ResponseMessage('A Book Category has been permanently deleted.')
  async delete(@Param('id') id: string) {
    return this.bookCategoryService.delete(id);
  }
}
