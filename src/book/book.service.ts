import { Injectable } from '@nestjs/common';
import { Helpers } from 'src/utilities/helpers';

import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Book } from '@prisma/client';

@Injectable()
export class BookService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllByFilter(query: any): Promise<Book[]> {
    return await this.prisma.book.findMany({
      where: query,
      include: {
        bookcategory: true,
      },
    });
  }

  async getByPagination(query: any): Promise<any> {
    const { filterObj, searchKey, searchVal, skip, take, sortKey, sortVal } =
      Helpers.queryOption(query, { searchKey: 'name' });

    const result = await this.prisma.book.findMany({
      where: { [searchKey]: { contains: searchVal }, ...filterObj },
      include: {
        bookcategory: true,
      },
      orderBy: { [sortKey]: sortVal },
      skip: skip * take,
      take: take,
    });

    const total = await this.prisma.book.count();

    return {
      data: result,
      pageInfo: {
        page: skip,
        pageSize: take,
        totalRowCount: total,
      },
    };
  }

  async getOneById(id: string): Promise<Book> {
    return await this.prisma.book.findUnique({
      where: { id: id },
      include: {
        bookcategory: true,
      },
    });
  }

  async create(book: CreateBookDto): Promise<Book> {
    return await this.prisma.book.create({ data: book });
  }

  async update(id: string, book: UpdateBookDto): Promise<Book> {
    return await this.prisma.book.update({
      where: { id: id },
      data: book,
    });
  }

  async delete(id: string): Promise<Book> {
    return await this.prisma.book.delete({ where: { id: id } });
  }
}
