import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/common.entity';
import { News } from 'src/news/entities/news.entity';
import { Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'news_videos' })
export class NewsVideo extends CommonEntity {
    @ManyToOne(() => News, (news) => news.newsVideos)
    public news: News;
}
