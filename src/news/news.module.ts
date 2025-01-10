import { forwardRef, Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsResolver } from './news.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Saved } from 'src/saved/entities/saved.entity';
import { Service } from 'src/services/entities/service.entity';
import { NewsImage } from './news-images/entities/news-image.entity';
import { NewsVideo } from './news-videos/entities/news-video.entity';
import { LikesModule } from 'src/likes/likes.module';
import { SavedModule } from 'src/saved/saved.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([News, Like, Saved, Service, NewsImage, NewsVideo]),
        LikesModule,
        forwardRef(() => SavedModule),
    ],

    providers: [NewsResolver, NewsService],
    exports: [NewsService],
})
export class NewsModule {}
