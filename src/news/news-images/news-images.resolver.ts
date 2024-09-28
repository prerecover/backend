import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NewsImagesService } from './news-images.service';
import { NewsImage } from './entities/news-image.entity';

@Resolver(() => NewsImage)
export class NewsImagesResolver {
    constructor(private readonly newsImagesService: NewsImagesService) {}

    @Query(() => [NewsImage], { name: 'newsImages' })
    findAll() {
        return this.newsImagesService.findAll();
    }

    @Query(() => NewsImage, { name: 'newsImage' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.newsImagesService.findOne(id);
    }

    @Mutation(() => NewsImage)
    removeNewsImage(@Args('id', { type: () => Int }) id: number) {
        return this.newsImagesService.remove(id);
    }
}
