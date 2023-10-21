import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionFilter } from 'src/config/handlers/catch-exception';
import { TransformationInterceptor } from 'src/config/handlers/response-success';

const envModule = ConfigModule.forRoot({
  isGlobal: true,
});

import { PrismaModule } from './prisma/prisma.module';

// USER
import { AuthModule } from './auth/auth.module';

import { BookCategoryModule } from './book-category/book-category.module';
import { BookModule } from './book/book.module';
import { CustomerModule } from './customer/customer.module';
import { SaleModule } from './sale/sale.module';
import { SaleRecordModule } from './sale-record/sale-record.module';

@Module({
  imports: [
    envModule,
    PrismaModule,

    // USER
    AuthModule,

    BookCategoryModule,
    BookModule,
    CustomerModule,
    SaleModule,
    SaleRecordModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformationInterceptor,
    },
  ],
})
export class AppModule {}
