import { Injectable } from '@nestjs/common';
import { CreateLikeInput } from './dto/create-like.input';
import { UpdateLikeInput } from './dto/update-like.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { PaginateArgs } from 'src/common/args/paginateArgs';

@Injectable()
export class LikesService {
    constructor(
        @InjectRepository(Like)
        private readonly likeRepository: Repository<Like>,
    ) { }
    async create(createLikeInput: CreateLikeInput) {
        return 'This action adds a new like';
    }

    async findAll(args: PaginateArgs): Promise<Like[]> {
        return await this.likeRepository.find({ relations: { news: true }, take: args.take, skip: args.skip });
    }

    async findOne(id: number) {
        return `This action returns a #${id} like`;
    }

    async update(id: number, updateLikeInput: UpdateLikeInput) {
        return `This action updates a #${id} like`;
    }

    async remove(id: number) {
        return `This action removes a #${id} like`;
    }
}
