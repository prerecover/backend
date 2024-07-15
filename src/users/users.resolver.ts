import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Mutation(() => User)
    async createUser(
        @Args('createUserInput') createUserInput: CreateUserInput,
        @Args('countryTitle') countryTitle: string,
    ): Promise<User> {
        return this.usersService.create(createUserInput, countryTitle);
    }

    @Query(() => [User], { name: 'users' })
    async findAll(@Args({ nullable: true }) args?: PaginateArgs) {
        return this.usersService.findAll(args);
    }

    @Query(() => User, { name: 'user' })
    async findOne(@Args('_id', { type: () => ID }) id: string) {
        return this.usersService.findOne(id);
    }

    @Mutation(() => User)
    async updateUser(
        @Args('updateUserInput') updateUserInput: UpdateUserInput,
        @Args('countryTitle', { nullable: true }) countryTitle: string,
    ) {
        return this.usersService.update(updateUserInput._id, updateUserInput, countryTitle);
    }

    @Mutation(() => User)
    removeUser(@Args('_id') id: string) {
        return this.usersService.remove(id);
    }
}
