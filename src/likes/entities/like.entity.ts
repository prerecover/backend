import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/common.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'likes' })
export class Like extends CommonEntity {
    @Field(() => Review)
    @ManyToOne(() => Review, (review) => review.likes, { onDelete: 'CASCADE', nullable: false })
    review: Review;

    @Field(() => User)
    @ManyToOne(() => User, (user) => user.likes, { onDelete: 'CASCADE', nullable: false })
    author: User;

    @Field()
    @Column({ name: 'is_positive', default: true })
    isPositive: boolean;
}
