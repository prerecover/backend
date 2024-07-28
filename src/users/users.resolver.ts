import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { CurrentUser } from 'src/common/shared/user.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Mutation(() => User)
    async createUser(
        @Args('createUserInput') createUserInput: CreateUserInput,
        @Args('countryTitle') countryTitle: string,
    ): Promise<User> {
        return await this.usersService.create(createUserInput, countryTitle);
    }

    @Query(() => [User], { name: 'users' })
    async findAll(@Args({ nullable: true }) args?: PaginateArgs) {
        return await this.usersService.findAll(args);
    }

    @Query(() => User, { name: 'user' })
    async findOne(@Args('_id', { type: () => ID }) id: string) {
        return await this.usersService.findOne(id);
    }

    @UseGuards(AuthGuard)
    @Query(() => User, { name: 'getMe' })
    async getMe(@CurrentUser() user: User) {
        return user;
    }
    @Mutation(() => User)
    async updateUser(
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
        @Args('countryTitle', { nullable: true }) countryTitle: string,
    ) {
        return await this.usersService.update(updateUserInput._id, updateUserInput, countryTitle);
    }

    @Mutation(() => User)
    async removeUser(@Args('_id') id: string) {
        return await this.usersService.remove(id);
    }
}
