import { ObjectType, Field } from '@nestjs/graphql';
import { slugify } from 'src/common/shared/slug';
import { User } from 'src/users/entities/user.entity';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'countries' })
export class Country {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    public readonly _id: string;

    @Field()
    @Column()
    public readonly title: string;

    @OneToMany(() => User, (user) => user.country)
    public users: User[];

    @Field()
    @Column()
    public slug: string;

    @BeforeInsert()
    generateSlug() {
        this.slug = slugify(this.title, { lower: true });
    }
}
