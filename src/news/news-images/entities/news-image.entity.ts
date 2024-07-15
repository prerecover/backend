import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/common.entity';
import { News } from 'src/news/entities/news.entity';
import { Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'news_images' })
export class NewsImage extends CommonEntity {
    @ManyToOne(() => News, (news) => news.newsImages)
    public news: News;
}
