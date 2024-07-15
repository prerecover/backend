import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/common.entity';
import { News } from 'src/news/entities/news.entity';
import { Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'likes' })
export class Like extends CommonEntity {
    @Field(() => News)
    @ManyToOne(() => News, (news) => news.likes, { onDelete: 'CASCADE' })
    public news: News;
}
