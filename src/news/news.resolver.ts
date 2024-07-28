import { Resolver, Query, Mutation, Args, Int, ID, ResolveField, Parent } from '@nestjs/graphql';
import { NewsService } from './news.service';
import { News } from './entities/news.entity';
import { CreateNewsInput } from './dto/create-news.input';
import { UpdateNewsInput } from './dto/update-news.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { Like } from 'src/likes/entities/like.entity';
import { LikesService } from 'src/likes/likes.service';
import { SavedService } from 'src/saved/saved.service';
import { CurrentUser } from 'src/common/shared/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Saved } from 'src/saved/entities/saved.entity';

@Resolver(() => News)
export class NewsResolver {
    constructor(
        private readonly newsService: NewsService,
        private readonly likeService: LikesService,
        private readonly savedService: SavedService,
    ) {}

    @Mutation(() => News)
    async createNews(@Args('createNewsInput') createNewsInput: CreateNewsInput) {
        return await this.newsService.create(createNewsInput);
    }

    @ResolveField('like', () => Like, { nullable: true })
    async likes(@CurrentUser() user: User, @Parent() news: News) {
        const { _id: newsId } = news;
        const userId = user ? user._id : null;
        console.log(userId);
        return await this.likeService.findForCard(newsId, userId);
    }
    @ResolveField('saved', () => Saved, { nullable: true })
    async saved(@CurrentUser() user: User, @Parent() news: News) {
        const { _id: newsId } = news;
        const userId = user ? user._id : null;
        return await this.savedService.findForCard(newsId, userId);
    }
    @Query(() => [News], { name: 'newsAll' })
    async findAll(@Args({ nullable: true }) args?: PaginateArgs) {
        return await this.newsService.findAll(args);
    }

    @Query(() => News, { name: 'news' })
    async findOne(@Args('_id', { type: () => ID }) _id: string) {
        return await this.newsService.findOne(_id);
    }

    @Mutation(() => News)
    async updateNews(@Args('updateNewsInput') updateNewsInput: UpdateNewsInput) {
        return await this.newsService.update(updateNewsInput.id, updateNewsInput);
    }

    @Mutation(() => News)
    async removeNews(@Args('id', { type: () => Int }) id: number) {
        return await this.newsService.remove(id);
    }
}
