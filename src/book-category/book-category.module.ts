import { Module } from '@nestjs/common';
import { BookCategoryService } from './book-category.service';
import { BookCategoryController } from './book-category.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BookCategoryController],
  providers: [BookCategoryService],
})
export class BookCategoryModule {}
