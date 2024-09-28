import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NewsVideosService } from './news-videos.service';
import { NewsVideo } from './entities/news-video.entity';

@Resolver(() => NewsVideo)
export class NewsVideosResolver {
    constructor(private readonly newsVideosService: NewsVideosService) {}

    @Query(() => [NewsVideo], { name: 'newsVideos' })
    findAll() {
        return this.newsVideosService.findAll();
    }

    @Query(() => NewsVideo, { name: 'newsVideo' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.newsVideosService.findOne(id);
    }

    @Mutation(() => NewsVideo)
    removeNewsVideo(@Args('id', { type: () => Int }) id: number) {
        return this.newsVideosService.remove(id);
    }
}
