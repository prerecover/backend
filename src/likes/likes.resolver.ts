import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { Like } from './entities/like.entity';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';

@Resolver(() => Like)
export class LikesResolver {
    constructor(private readonly likesService: LikesService) { }

    @Mutation(() => Like)
    async createLike(@Args('createLikeInput') createLikeInput: CreateLikeInput) {
        return await this.likesService.create(createLikeInput);
    }

    @Query(() => [Like], { name: 'likes' })
    async findAll(@Args({ nullable: true }) args?: PaginateArgs) {
        return this.likesService.findAll(args);
    }

    @Query(() => Like, { name: 'like' })
    async findOne(@Args('id', { type: () => Int }) id: number) {
        return await this.likesService.findOne(id);
    }

    @Mutation(() => Like)
    async updateLike(@Args('updateLikeInput') updateLikeInput: UpdateLikeInput) {
        return await this.likesService.update(updateLikeInput.id, updateLikeInput);
    }

    @Mutation(() => Like)
    async removeLike(@Args('id', { type: () => Int }) id: number) {
        return await this.likesService.remove(id);
    }
}
