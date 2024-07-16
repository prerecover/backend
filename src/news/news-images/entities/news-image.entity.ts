import { ObjectType, Field } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/common.entity';
import { News } from 'src/news/entities/news.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'news_images' })
export class NewsImage extends CommonEntity {
    @Field(() => News)
    @ManyToOne(() => News, (news) => news.newsImages)
    public news: News;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public image: string;
}
