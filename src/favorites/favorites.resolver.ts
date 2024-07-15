import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { FavoritesService } from './favorites.service';
import { Favorite } from './entities/favorite.entity';
import { AuthorId } from 'src/common/args/authorId';
import { BookId } from 'src/common/args/bookId';
import { PaginateArgs } from 'src/common/args/paginateArgs';

@Resolver(() => Favorite)
export class FavoritesResolver {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Mutation(() => Favorite)
    async createFavorite(@Args() userId: AuthorId, @Args() bookId: BookId) {
        return this.favoritesService.create(userId.authorId, bookId.bookId);
    }

    @Query(() => [Favorite], { name: 'favorites' })
    async findAll(@Args() args: PaginateArgs) {
        return await this.favoritesService.findAll(args);
    }

    @Query(() => Favorite, { name: 'favorite' })
    async findOne(@Args('_id') id: string) {
        return await this.favoritesService.findOne(id);
    }
    @Query(() => Favorite, { name: 'favoriteByUserId' })
    async findByUserId(@Args('userId') userId: string) {
        return await this.favoritesService.findByUserId(userId);
    }

    @Mutation(() => Favorite)
    async removeFavorite(@Args('id') id: string) {
        return await this.favoritesService.remove(id);
    }
}
