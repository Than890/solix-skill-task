import { Injectable } from '@nestjs/common';
import { Helpers } from 'src/utilities/helpers';

import { CreateBookCategoryDto } from './dto/create-book-category.dto';
import { UpdateBookCategoryDto } from './dto/update-book-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BookCategory } from '@prisma/client';

@Injectable()
export class BookCategoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllByFilter(query: any): Promise<BookCategory[]> {
    return await this.prisma.bookCategory.findMany({
      where: query,
    });
  }

  async getByPagination(query: any): Promise<any> {
    const { filterObj, searchKey, searchVal, skip, take, sortKey, sortVal } =
      Helpers.queryOption(query, { searchKey: 'name' });

    const result = await this.prisma.bookCategory.findMany({
      where: { [searchKey]: { contains: searchVal }, ...filterObj },
      orderBy: { [sortKey]: sortVal },
      skip: skip * take,
      take: take,
    });

    const total = await this.prisma.bookCategory.count();

    return {
      data: result,
      pageInfo: {
        page: skip,
        pageSize: take,
        totalRowCount: total,
      },
    };
  }

  async getOneById(id: string): Promise<BookCategory> {
    return await this.prisma.bookCategory.findUnique({
      where: { id: id },
    });
  }

  async create(bookCategory: CreateBookCategoryDto): Promise<BookCategory> {
    return await this.prisma.bookCategory.create({ data: bookCategory });
  }

  async update(
    id: string,
    bookCategory: UpdateBookCategoryDto,
  ): Promise<BookCategory> {
    return await this.prisma.bookCategory.update({
      where: { id: id },
      data: bookCategory,
    });
  }

  async delete(id: string): Promise<BookCategory> {
    return await this.prisma.bookCategory.delete({ where: { id: id } });
  }
}
