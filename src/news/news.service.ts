import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateNewsInput } from './dto/create-news.input';
import { UpdateNewsInput } from './dto/update-news.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { InjectRepository } from '@nestjs/typeorm';
import { News } from './entities/news.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NewsService {
    constructor(
        @InjectRepository(News)
        private readonly newsRepository: Repository<News>,
    ) {}

    async create(createNewsInput: CreateNewsInput) {
        const news = this.newsRepository.create(createNewsInput);
        return await this.newsRepository.save(news);
    }

    async findAll(args: PaginateArgs): Promise<News[]> {
        const news = await this.newsRepository.find({
            relations: { newsImages: true, newsVideos: true, saved: true, likes: true, clinic: true },
            take: args.take,
            skip: args.skip,
        });
        console.log(news.map((e) => e.likes));
        return news;
    }

    async findOne(id: string) {
        const news = await this.newsRepository.findOne({
            where: { _id: id },
            relations: { newsImages: true, newsVideos: true, likes: true, saved: true, clinic: true },
        });
        if (!news) throw new NotFoundException('News with that id not found!');
        return news;
    }

    async update(id: number, updateNewsInput: UpdateNewsInput) {
        return `This action updates a #${id} news`;
    }

    async remove(id: number) {
        return `This action removes a #${id} news`;
    }
}
