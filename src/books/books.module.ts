import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksResolver } from './books.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { User } from 'src/users/entities/user.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Language } from 'src/languages/entities/language.entity';
import { MinioService } from 'src/config/s3/minio.service';

@Module({
    providers: [BooksResolver, BooksService, MinioService],
    imports: [TypeOrmModule.forFeature([Book, User, Category, Language])],
})
export class BooksModule {}
