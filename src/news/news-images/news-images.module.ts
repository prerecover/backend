import { Module } from '@nestjs/common';
import { NewsImagesService } from './news-images.service';
import { NewsImagesResolver } from './news-images.resolver';

@Module({
    providers: [NewsImagesResolver, NewsImagesService],
})
export class NewsImagesModule {}
