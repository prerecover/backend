import { ObjectType, Field } from '@nestjs/graphql';
import { Category } from 'src/categories/entities/category.entity';
import { CommonEntity } from 'src/common/common.entity';
import { slugify } from 'src/common/shared/slug';
import { Favorite } from 'src/favorites/entities/favorite.entity';
import { Language } from 'src/languages/entities/language.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import { BeforeInsert, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

@ObjectType()
@Entity({ name: 'books' })
export class Book extends CommonEntity {
    @Field()
    @Column({ length: 255 })
    public title: string;

    @Field()
    @Column()
    public slug: string;

    @Field()
    @Column({ length: 255 })
    public summary: string;

    @Field()
    @Column({ type: 'text' })
    public description: string;

    @OneToMany(() => Review, (review) => review.author)
    public reviews: Review[];

    @OneToMany(() => Favorite, (fav) => fav.book)
    public favorites: Favorite[];

    @Field(() => Language, { nullable: true })
    @ManyToOne(() => Language, (language) => language.books)
    public language: Language;

    @Field()
    @Column({ name: 'is_draft', default: false })
    public isDraft: boolean;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.books)
    public author: User;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public file: string;

    @Field(() => [Category])
    @ManyToMany(() => Category)
    @JoinTable({ name: 'books_categories' })
    public categories: Category[];

    @BeforeInsert()
    generateSlug() {
        this.slug = slugify(this.title, { lower: true });
    }
}
