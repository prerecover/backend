import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsResolver } from './reviews.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import { Book } from 'src/books/entities/book.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Review, User, Book])],
    providers: [ReviewsResolver, ReviewsService],
})
export class ReviewsModule { }
