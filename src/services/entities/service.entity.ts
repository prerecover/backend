import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/common.entity';
import { News } from 'src/news/entities/news.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@ObjectType()
@Entity({ name: 'services' })
export class Service extends CommonEntity {
    @Field()
    @Column({ length: 225 })
    public title: string;

    @Field()
    @Column({ default: false })
    public online: boolean;

    @Field()
    @Column({ length: 225 })
    public description: string;

    @Field(() => Int)
    @Column()
    public duration: number;

    @Field(() => Float)
    @Column({ type: 'float' })
    public price: number;

    @OneToMany(() => News, (news) => news.service)
    public news: News[];
}
