import { Injectable } from '@nestjs/common';
import { Helpers } from 'src/utilities/helpers';

import { CreateSaleDto } from './dto/create-sale.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Sale } from '@prisma/client';

@Injectable()
export class SaleService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllByFilter(query: any): Promise<Sale[]> {
    return await this.prisma.sale.findMany({
      where: query,
      include: {
        sale_details: {
          include: {
            book: true,
          },
        },
        sale_records: {
          include: {
            customer: true,
          },
        },
      },
    });
  }

  async getByPagination(query: any): Promise<any> {
    const { filterObj, searchKey, searchVal, skip, take, sortKey, sortVal } =
      Helpers.queryOption(query, { searchKey: 'paid_amount' });

    const result = await this.prisma.sale.findMany({
      where: { [searchKey]: { contains: searchVal }, ...filterObj },
      include: {
        sale_details: {
          include: {
            book: true,
          },
        },
        sale_records: {
          include: {
            customer: true,
          },
        },
      },
      orderBy: { [sortKey]: sortVal },
      skip: skip * take,
      take: take,
    });

    const total = await this.prisma.sale.count();

    return {
      data: result,
      pageInfo: {
        page: skip,
        pageSize: take,
        totalRowCount: total,
      },
    };
  }

  async getOneById(id: string): Promise<Sale> {
    return await this.prisma.sale.findUnique({
      where: { id: id },
      include: {
        sale_details: {
          include: {
            book: true,
          },
        },
        sale_records: {
          include: {
            customer: true,
          },
        },
      },
    });
  }

  async create(sale: CreateSaleDto): Promise<Sale> {
    const bookDetail = sale.book_detail;
    delete sale.book_detail;

    const createdSale = await this.prisma.sale.create({ data: sale });

    const books = bookDetail.map((data: any) => {
      data.sale_id = createdSale.id;
      return data;
    });

    await this.prisma.saleDetail.createMany({
      data: books,
    });

    await this.prisma.saleRecord.create({
      data: {
        sale_id: createdSale.id,
        customer_id: sale.customer_id,
        paid_amount: sale.paid_amount,
        user_id: sale.user_id,
      },
    });
    return createdSale;
  }

  async delete(id: string): Promise<Sale> {
    await this.prisma.saleDetail.deleteMany({ where: { sale_id: id } });
    return await this.prisma.sale.delete({ where: { id: id } });
  }
}
