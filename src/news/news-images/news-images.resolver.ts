import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { NewsImagesService } from './news-images.service';
import { NewsImage } from './entities/news-image.entity';
import { CreateNewsImageInput } from './dto/create-news-image.input';
import { UpdateNewsImageInput } from './dto/update-news-image.input';

@Resolver(() => NewsImage)
export class NewsImagesResolver {
    constructor(private readonly newsImagesService: NewsImagesService) {}

    @Mutation(() => NewsImage)
    createNewsImage(@Args('createNewsImageInput') createNewsImageInput: CreateNewsImageInput) {
        return this.newsImagesService.create(createNewsImageInput);
    }

    @Query(() => [NewsImage], { name: 'newsImages' })
    findAll() {
        return this.newsImagesService.findAll();
    }

    @Query(() => NewsImage, { name: 'newsImage' })
    findOne(@Args('id', { type: () => Int }) id: number) {
        return this.newsImagesService.findOne(id);
    }

    @Mutation(() => NewsImage)
    updateNewsImage(@Args('updateNewsImageInput') updateNewsImageInput: UpdateNewsImageInput) {
        return this.newsImagesService.update(updateNewsImageInput.id, updateNewsImageInput);
    }

    @Mutation(() => NewsImage)
    removeNewsImage(@Args('id', { type: () => Int }) id: number) {
        return this.newsImagesService.remove(id);
    }
}
