import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { CurrentUser } from 'src/common/shared/user.decorator';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import * as GraphQLUpload from 'graphql-upload/GraphQLUpload.js';
import { FileUpload } from 'src/common/shared/file.interface';
import { AvatarUpload } from './dto/avatar-upload';

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

    @Mutation(() => String, { name: 'uploadAvatar' })
    async uploadAvatar(@CurrentUser() user: User, @Args('avatarUpload') avatar: AvatarUpload) {
        return this.usersService.uploadAvatar(avatar, user._id);
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

    @UseGuards(AuthGuard)
    @Mutation(() => User, { name: 'changeMe' })
    async changeMe(@CurrentUser() user: User, @Args('changeMeInput') changeMeInput: UpdateUserInput) {
        return await this.usersService.changeMe(user._id, changeMeInput);
    }

    @Mutation(() => User)
    async removeUser(@Args('_id') id: string) {
        return await this.usersService.remove(id);
    }
}
