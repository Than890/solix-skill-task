import { Injectable } from '@nestjs/common';
import { Helpers } from 'src/utilities/helpers';

import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Customer } from '@prisma/client';

@Injectable()
export class CustomerService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllByFilter(query: any): Promise<Customer[]> {
    return await this.prisma.customer.findMany({
      where: query,
    });
  }

  async getByPagination(query: any): Promise<any> {
    const { filterObj, searchKey, searchVal, skip, take, sortKey, sortVal } =
      Helpers.queryOption(query, { searchKey: 'name' });

    const result = await this.prisma.customer.findMany({
      where: { [searchKey]: { contains: searchVal }, ...filterObj },
      orderBy: { [sortKey]: sortVal },
      skip: skip * take,
      take: take,
    });

    const total = await this.prisma.customer.count();

    return {
      data: result,
      pageInfo: {
        page: skip,
        pageSize: take,
        totalRowCount: total,
      },
    };
  }

  async getOneById(id: string): Promise<Customer> {
    return await this.prisma.customer.findUnique({
      where: { id: id },
    });
  }

  async create(customer: CreateCustomerDto): Promise<Customer> {
    return await this.prisma.customer.create({ data: customer });
  }

  async update(id: string, customer: UpdateCustomerDto): Promise<Customer> {
    return await this.prisma.customer.update({
      where: { id: id },
      data: customer,
    });
  }

  async delete(id: string): Promise<Customer> {
    return await this.prisma.customer.delete({ where: { id: id } });
  }
}
