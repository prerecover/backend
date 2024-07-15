import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '../../common/common.entity';
import { BeforeInsert, BeforeUpdate, Column, DeleteDateColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Country } from 'src/countries/entities/country.entity';
import { Book } from 'src/books/entities/book.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Like } from 'src/likes/entities/like.entity';
import { Favorite } from 'src/favorites/entities/favorite.entity';

const BCRYPT_HASH_ROUNDS = 10;

@ObjectType()
@Entity({ name: 'users' })
export class User extends CommonEntity {
    @Field()
    @Column({ unique: true, length: 30 })
    public login: string;

    @Field()
    @Column({ name: 'first_name', length: 30 })
    public firstName: string;

    @Field({ nullable: true })
    @ManyToOne(() => Country, (country) => country.users, { onDelete: 'SET NULL' })
    public country: Country;

    @OneToMany(() => Book, (book) => book.author)
    public books: Book[];

    @OneToMany(() => Review, (review) => review.author)
    public reviews: Review[];

    @OneToMany(() => Like, (like) => like.author)
    public likes: Like[];

    @OneToMany(() => Favorite, (fav) => fav.user)
    public favorites: Favorite[];

    @Field()
    @Column({ name: 'last_name', length: 30 })
    public lastName: string;

    @Field()
    @Column({ length: 225, unique: true })
    public email: string;

    @HideField()
    @Column({})
    public password: string;

    @Field({ nullable: true })
    @Column({ type: 'date', nullable: true })
    public birthday: Date;

    @Column({ name: 'is_verified', default: false })
    @Field()
    public isVerfied: boolean;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public avatar: string;

    @Field()
    @Column({ nullable: true })
    public sex: boolean;

    @Field({ nullable: true })
    @DeleteDateColumn({ name: 'deleted_at', nullable: true, type: 'timestamp with time zone' })
    public deletedAt: Date;

    @BeforeInsert()
    @BeforeUpdate()
    async beforeInsertOrUpdate() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, BCRYPT_HASH_ROUNDS);
        }
    }
}
