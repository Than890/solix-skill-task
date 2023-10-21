import { PartialType } from '@nestjs/swagger';
import { CreateSaleRecordDto } from './create-sale-record.dto';

export class UpdateSaleRecordDto extends PartialType(CreateSaleRecordDto) {}
