import { Injectable } from '@nestjs/common';
import { Helpers } from 'src/utilities/helpers';

import { CreateSaleRecordDto } from './dto/create-sale-record.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SaleRecord } from '@prisma/client';

@Injectable()
export class SaleRecordService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllByFilter(query: any): Promise<SaleRecord[]> {
    return await this.prisma.saleRecord.findMany({
      where: query,
      include: {
        sale: true,
        customer: true,
      },
    });
  }

  async getByPagination(query: any): Promise<any> {
    const { filterObj, searchKey, searchVal, skip, take, sortKey, sortVal } =
      Helpers.queryOption(query, { searchKey: 'customer_name' });

    const result = await this.prisma.saleRecord.findMany({
      where: { [searchKey]: { contains: searchVal }, ...filterObj },
      include: {
        sale: true,
        customer: true,
      },
      orderBy: { [sortKey]: sortVal },
      skip: skip * take,
      take: take,
    });

    const total = await this.prisma.saleRecord.count();

    return {
      data: result,
      pageInfo: {
        page: skip,
        pageSize: take,
        totalRowCount: total,
      },
    };
  }

  async getOneById(id: string): Promise<SaleRecord> {
    return await this.prisma.saleRecord.findUnique({
      where: { id: id },
      include: {
        sale: true,
        customer: true,
      },
    });
  }

  async create(saleRecord: CreateSaleRecordDto): Promise<SaleRecord> {
    await this.prisma.sale.update({
      where: { id: saleRecord.sale_id },
      data: {
        paid_amount: { increment: saleRecord.paid_amount },
        due_amount: { decrement: saleRecord.paid_amount },
      },
    });
    return await this.prisma.saleRecord.create({ data: saleRecord });
  }

  async delete(id: string): Promise<SaleRecord> {
    return await this.prisma.saleRecord.delete({ where: { id: id } });
  }
}
