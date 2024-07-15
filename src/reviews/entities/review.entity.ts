import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';
import { CommonEntity } from 'src/common/common.entity';
import { Like } from 'src/likes/entities/like.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@ObjectType()
@Entity({ name: 'reviews' })
export class Review extends CommonEntity {
    @Field(() => User)
    @ManyToOne(() => User, (user) => user.reviews)
    public author: User;

    @Field(() => Book)
    @ManyToOne(() => Book, (book) => book.reviews)
    public book: Book;

    @Field(() => [Like])
    @OneToMany(() => Like, (like) => like.review)
    likes: Like[];

    @Field(() => Float)
    @Column({ type: 'float' })
    public rating: number;

    @Field()
    @Column({ type: 'text' })
    public text: string;
}
