import { Resolver, Query, Mutation, Args, Int, ResolveField, Parent, ID } from '@nestjs/graphql';
import { LikesService } from './likes.service';
import { Like } from './entities/like.entity';
import { CreateLikeInput } from './dto/create-like.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Like)
export class LikesResolver {
    constructor(
        private readonly likesService: LikesService,
        private readonly userService: UsersService,
    ) {}

    @Mutation(() => Like)
    @UseGuards(AuthGuard)
    async createLike(@Args('createLikeInput') createLikeInput: CreateLikeInput) {
        return await this.likesService.create(createLikeInput);
    }

    @Query(() => [Like], { name: 'likes' })
    async findAll(@Args({ nullable: true }) args?: PaginateArgs) {
        return this.likesService.findAll(args);
    }

    @Query(() => Like, { name: 'like' })
    async findOne(@Args('id', { type: () => ID }) id: string) {
        return await this.likesService.findOne(id);
    }

    @Mutation(() => Like)
    async removeLike(@Args('_id') _id: string) {
        return await this.likesService.remove(_id);
    }
}
