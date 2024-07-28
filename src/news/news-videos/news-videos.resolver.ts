import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NewsVideosService } from './news-videos.service';
import { NewsVideo } from './entities/news-video.entity';
import { CreateNewsVideoInput } from './dto/create-news-video.input';
import { UpdateNewsVideoInput } from './dto/update-news-video.input';

@Resolver(() => NewsVideo)
export class NewsVideosResolver {
    constructor(private readonly newsVideosService: NewsVideosService) {}

    @Mutation(() => NewsVideo)
    createNewsVideo(@Args('createNewsVideoInput') createNewsVideoInput: CreateNewsVideoInput) {
        return this.newsVideosService.create(createNewsVideoInput);
    }

    @Query(() => [NewsVideo], { name: 'newsVideos' })
    findAll() {
        return this.newsVideosService.findAll();
    }

    @Query(() => NewsVideo, { name: 'newsVideo' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.newsVideosService.findOne(id);
    }

    @Mutation(() => NewsVideo)
    updateNewsVideo(@Args('updateNewsVideoInput') updateNewsVideoInput: UpdateNewsVideoInput) {
        return this.newsVideosService.update(updateNewsVideoInput.id, updateNewsVideoInput);
    }

    @Mutation(() => NewsVideo)
    removeNewsVideo(@Args('id', { type: () => Int }) id: number) {
        return this.newsVideosService.remove(id);
    }
}
