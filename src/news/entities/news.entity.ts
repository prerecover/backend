import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { CommonEntity } from 'src/common/common.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Saved } from 'src/saved/entities/saved.entity';
import { Service } from 'src/services/entities/service.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { NewsImage } from '../news-images/entities/news-image.entity';
import { NewsVideo } from '../news-videos/entities/news-video.entity';

@ObjectType()
@Entity({ name: 'news' })
export class News extends CommonEntity {
    @Field()
    @Column({ unique: true, length: 225 })
    public title: string;

    @Field()
    @Column({ type: 'text' })
    public text: string;

    @Field(() => Int)
    @OneToMany(() => Like, (like) => like.news)
    public likes: Like[];

    @Field(() => Int)
    @OneToMany(() => Saved, (saved) => saved.news)
    public saved: Saved[];

    @Field(() => [NewsImage])
    @OneToMany(() => NewsImage, (ni) => ni.news)
    public newsImages: NewsImage[];

    @Field(() => [NewsVideo])
    @OneToMany(() => NewsVideo, (nv) => nv.news)
    public newsVideos: NewsVideo[];

    @ManyToOne(() => Clinic, (clinic) => clinic.news)
    public clinic: Clinic;

    @ManyToOne(() => Service, (service) => service.news)
    public service: Service;
}
