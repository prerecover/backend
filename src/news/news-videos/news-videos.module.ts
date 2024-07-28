import { Module } from '@nestjs/common';
import { NewsVideosService } from './news-videos.service';
import { NewsVideosResolver } from './news-videos.resolver';

@Module({
    providers: [NewsVideosResolver, NewsVideosService],
})
export class NewsVideosModule {}
