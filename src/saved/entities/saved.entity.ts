import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/common.entity';
import { News } from 'src/news/entities/news.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'saved' })
export class Saved extends CommonEntity {
    @Field(() => News)
    @ManyToOne(() => News, (news) => news.saved, { onDelete: 'CASCADE' })
    public news: News;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.saved, { onDelete: 'CASCADE', nullable: false })
    public author: User;
}
