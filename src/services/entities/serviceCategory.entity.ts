import { ObjectType, Field } from '@nestjs/graphql';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Service } from './service.entity';
import { slugify } from 'src/common/shared/slug';

@ObjectType()
@Entity({ name: 'service_categories' })
export class ServiceCategory {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    public readonly _id: string;

    @Field()
    @Column()
    public readonly title: string;

    @OneToMany(() => Service, (service) => service.category)
    public services: Service[];

    @Field()
    @Column()
    public slug: string;

    @BeforeInsert()
    generateSlug() {
        this.slug = slugify(this.title, { lower: true });
    }
}
