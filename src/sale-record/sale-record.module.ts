import { Module } from '@nestjs/common';
import { SaleRecordService } from './sale-record.service';
import { SaleRecordController } from './sale-record.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SaleRecordController],
  providers: [SaleRecordService],
})
export class SaleRecordModule {}
