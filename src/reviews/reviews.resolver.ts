import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { CreateReviewInput } from './dto/create-review.input';
import { UpdateReviewInput } from './dto/update-review.input';
import { BookId } from 'src/common/args/bookId';
import { AuthorId } from 'src/common/args/authorId';
import { PaginateArgs } from 'src/common/args/paginateArgs';

@Resolver(() => Review)
export class ReviewsResolver {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Mutation(() => Review)
    async createReview(
        @Args('createReviewInput') createReviewInput: CreateReviewInput,
        @Args() authorId: AuthorId,
        @Args() bookId: BookId,
    ) {
        return await this.reviewsService.create(createReviewInput, authorId.authorId, bookId.bookId);
    }

    @Query(() => [Review], { name: 'reviews' })
    async findAll(@Args({ nullable: true }) args?: PaginateArgs) {
        return await this.reviewsService.findAll(args);
    }
    @Query(() => [Review], { name: 'reviewsByBookId' })
    async findByBookId(@Args('bookId') bookId: string) {
        return await this.reviewsService.findByBookId(bookId);
    }

    @Query(() => Review, { name: 'review' })
    async findOne(@Args('_id') id: string) {
        return await this.reviewsService.findOne(id);
    }

    @Mutation(() => Review)
    async updateReview(@Args('updateReviewInput') updateReviewInput: UpdateReviewInput) {
        return await this.reviewsService.update(updateReviewInput._id, updateReviewInput);
    }

    @Mutation(() => Review)
    async removeReview(@Args('_id') id: string) {
        return await this.reviewsService.remove(id);
    }
}
