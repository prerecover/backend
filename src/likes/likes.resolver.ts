import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { Like } from './entities/like.entity';
import { AuthorId } from 'src/common/args/authorId';
import { ReviewId } from 'src/common/args/reviewId';
import { PaginateArgs } from 'src/common/args/paginateArgs';

@Resolver(() => Like)
export class LikesResolver {
    constructor(private readonly likesService: LikesService) {}

    @Mutation(() => Like)
    async createLike(@Args() authorId: AuthorId, @Args() reviewId: ReviewId, @Args('isPositive') isPositive: boolean) {
        return this.likesService.create(authorId.authorId, reviewId.reviewId, isPositive);
    }

    @Query(() => [Like], { name: 'likes' })
    async findAll(@Args({ nullable: true }) args: PaginateArgs) {
        return this.likesService.findAll(args);
    }

    @Query(() => Like, { name: 'like' })
    async findOne(@Args('_id') id: string) {
        return this.likesService.findOne(id);
    }

    @Mutation(() => Like)
    async updateLike(@Args('_id') id: string, @Args('isPositive') isPositive: boolean) {
        return this.likesService.update(id, isPositive);
    }

    @Mutation(() => Like)
    async removeLike(@Args('_id') id: string) {
        return this.likesService.remove(id);
    }
}
