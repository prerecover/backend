import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeInput } from './dto/create-like.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { User } from 'src/users/entities/user.entity';
import { News } from 'src/news/entities/news.entity';

@Injectable()
export class LikesService {
    constructor(
        @InjectRepository(Like)
        private readonly likeRepository: Repository<Like>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(News)
        private readonly newsRepository: Repository<News>,
    ) {}
    async create(createLikeInput: CreateLikeInput) {
        const like = this.likeRepository.create({
            author: { _id: createLikeInput.authorId },
            news: { _id: createLikeInput.newsId },
        });
        return await this.likeRepository.save(like);
    }

    async findAll(args?: PaginateArgs): Promise<Like[]> {
        return await this.likeRepository.find({
            relations: { author: true },
            take: args.take,
            skip: args.skip,
        });
    }

    async findOne(id: string) {
        const like = await this.likeRepository.findOne({ where: { _id: id }, relations: { author: true } });
        if (!like) throw new NotFoundException('Like with that id not found!');
        return like;
    }

    async findForCard(newsId: string, userId: string) {
        if (!userId) {
            return null;
        }
        const likes = await this.likeRepository.findOne({
            where: { news: { _id: newsId }, author: { _id: userId } },
            relations: { author: true },
        });
        return likes;
    }

    async remove(id: string) {
        const like = await this.findOne(id);
        await this.likeRepository.delete({ _id: id });
        return like;
    }
}
