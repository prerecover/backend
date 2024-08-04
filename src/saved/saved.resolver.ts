import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { SavedService } from './saved.service';
import { Saved } from './entities/saved.entity';
import { CreateSavedInput } from './dto/create-saved.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/common/shared/user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Saved)
export class SavedResolver {
    constructor(private readonly savedService: SavedService) {}

    @Mutation(() => Saved)
    @UseGuards(AuthGuard)
    async createSaved(@Args('createSavedInput') createSavedInput: CreateSavedInput) {
        return await this.savedService.create(createSavedInput);
    }

    @UseGuards(AuthGuard)
    @Query(() => [Saved], { name: 'savedAll' })
    async findAll(@CurrentUser() user: User, @Args({ nullable: true }) args?: PaginateArgs) {
        return this.savedService.findAll(user._id, args);
    }

    @Query(() => Saved, { name: 'saved' })
    findOne(@Args('_id') _id: string) {
        return this.savedService.findOne(_id);
    }

    @Mutation(() => Saved)
    async removeSaved(@Args('_id') _id: string) {
        return await this.savedService.remove(_id);
    }
}
