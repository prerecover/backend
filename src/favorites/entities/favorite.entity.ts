import { ObjectType, Field } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';
import { CommonEntity } from 'src/common/common.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'favorites' })
export class Favorite extends CommonEntity {
    @Field(() => User)
    @ManyToOne(() => User, (user) => user.favorites, { onDelete: 'CASCADE' })
    user: User;

    @Field(() => Book)
    @ManyToOne(() => Book, (book) => book.favorites, { onDelete: 'CASCADE' })
    book: Book;
}
