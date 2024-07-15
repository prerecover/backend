import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';
import { PaginateArgs } from 'src/common/args/paginateArgs';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Book)
        private readonly bookRepository: Repository<Book>,
    ) {}

    async create(createReviewInput: CreateReviewInput, authorId: string, bookId: string) {
        const review = this.reviewRepository.create(createReviewInput);
        const author = await this.userRepository.findOneBy({ _id: authorId });
        const book = await this.bookRepository.findOneBy({ _id: bookId });
        review.author = author;
        review.book = book;
        return await this.reviewRepository.save(review);
    }

    async findAll(args: PaginateArgs): Promise<Review[]> {
        return await this.reviewRepository.find({
            relations: { book: true, author: true },
            take: args.take,
            skip: args.skip,
        });
    }

    async findOne(id: string) {
        const review = await this.reviewRepository.findOne({
            where: { _id: id },
            relations: { book: true, author: true },
        });
        if (!review) throw new NotFoundException('Review not found!');
        return review;
    }

    async findByBookId(bookId: string) {
        const book = await this.bookRepository.findOneBy({ _id: bookId });
        return await this.reviewRepository.find({ relations: { book: true, author: true }, where: { book: book } });
    }

    async update(id: string, updateReviewInput: UpdateReviewInput) {
        const review = await this.findOne(id);
        const { ...data } = updateReviewInput;
        const newReview = await this.reviewRepository.save({
            ...review,
            ...data,
        });
        return newReview;
    }

    async remove(id: string) {
        const review = await this.findOne(id);
        await this.reviewRepository.delete({ _id: id });
        return review;
    }
}
