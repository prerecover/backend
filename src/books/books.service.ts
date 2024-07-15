import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { CategoryInput } from './dto/category-input';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { In, Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';
import { User } from 'src/users/entities/user.entity';
import { Language } from 'src/languages/entities/language.entity';
import { Category } from 'src/categories/entities/category.entity';
import { MinioService } from 'src/config/s3/minio.service';
import { PaginateArgs } from 'src/common/args/paginateArgs';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Language)
        private readonly languageRepository: Repository<Language>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
        @Inject()
        private readonly minioService: MinioService,
    ) {}

    @Transactional()
    async getQuerySet(authorId: string, languageTitle: string, categories: CategoryInput[]) {
        const author = await this.userRepository.findOneBy({ _id: authorId });
        const language = await this.languageRepository.findOneBy({ title: languageTitle });
        const categoriesList = await this.categoryRepository.find({
            where: { title: In(categories ? categories.map((el) => el.title) : []) },
        });
        return { author, language, categoriesList };
    }

    @Transactional()
    async create(
        createBookInput: CreateBookInput,
        authorId: string,
        languageTitle: string,
        categories: CategoryInput[],
    ) {
        const { file, ...data } = createBookInput;
        const book = this.bookRepository.create(data);
        if (file) {
            const path = await this.minioService.uploadFile(await file, 'book_file');
            book.file = `${this.minioService.pathToFile}/${path}`;
        }
        const { categoriesList, language, author } = await this.getQuerySet(authorId, languageTitle, categories);
        book.author = author;
        book.language = language;
        book.categories = categoriesList;
        return await this.bookRepository.save(book);
    }

    async findAll(args: PaginateArgs) {
        return await this.bookRepository.find({
            relations: { categories: true, author: true, language: true },
            skip: args.skip,
            take: args.take,
        });
    }

    async findOne(id: string) {
        const book = await this.bookRepository.findOne({
            relations: { categories: true, author: true, language: true },
            where: {
                _id: id,
            },
        });
        if (!book) throw new NotFoundException('Book not found!');
        return book;
    }

    @Transactional()
    async update(id: string, updateBookInput: UpdateBookInput, categories: CategoryInput[]) {
        const categoriesList = await this.categoryRepository.find({
            where: { title: In(categories ? categories.map((el) => el.title) : []) },
        });
        const book = await this.findOne(id);
        const { file, ...data } = updateBookInput;
        if (file) {
            const path = await this.minioService.uploadFile(await file, 'book_file');
            book.file = `${this.minioService.pathToFile}/${path}`;
        }
        book.categories = categoriesList ? categoriesList : book.categories;
        const newBook = await this.bookRepository.save({
            ...book,
            ...data,
        });
        return newBook;
    }

    async remove(id: string) {
        const book = await this.findOne(id);
        await this.bookRepository.delete({ _id: id });
        return book;
    }
}
