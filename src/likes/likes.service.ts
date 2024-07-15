import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Args } from '@nestjs/graphql';
import { PaginateArgs } from 'src/common/args/paginateArgs';

@Injectable()
export class LikesService {
    constructor(
        @InjectRepository(Review)
        private readonly reviewRepository: Repository<Review>,
        @InjectRepository(Like)
        private readonly likeRepository: Repository<Like>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async getQuerySet(authorId: string, reviewId: string) {
        const author = await this.userRepository.findOneBy({ _id: authorId });
        const review = await this.reviewRepository.findOneBy({ _id: reviewId });
        return { author, review };
    }

    async create(authorId: string, reviewId: string, isPositive: boolean) {
        const like = this.likeRepository.create({ isPositive: isPositive });
        const { author, review } = await this.getQuerySet(authorId, reviewId);
        like.author = author;
        like.review = review;
        return await this.likeRepository.save(like);
    }

    async findAll(args: PaginateArgs) {
        return await this.likeRepository.find({
            relations: { review: true, author: true },
            skip: args.skip,
            take: args.take,
        });
    }

    async findOne(id: string) {
        const like = await this.likeRepository.findOne({
            where: { _id: id },
            relations: { review: true, author: true },
        });
        if (!like) throw new NotFoundException('Like not found!');
        return like;
    }

    async update(id: string, isPositive: boolean) {
        const like = await this.findOne(id);
        like.isPositive = isPositive;
        return await this.likeRepository.save(like);
    }

    async remove(id: string) {
        const like = await this.findOne(id);
        await this.likeRepository.delete({ _id: id });
        return like;
    }
}
