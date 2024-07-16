import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { CommonEntity } from 'src/common/common.entity';
import { News } from 'src/news/entities/news.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

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

    @Field(() => Clinic)
    @ManyToOne(() => Clinic, (clinic) => clinic.services, { onDelete: 'CASCADE' })
    public clinic: Clinic;

    @OneToMany(() => News, (news) => news.service)
    public news: News[];
}
