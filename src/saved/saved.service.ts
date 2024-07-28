import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSavedInput } from './dto/create-saved.input';
import { UpdateSavedInput } from './dto/update-saved.input';
import { Saved } from './entities/saved.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateArgs } from 'src/common/args/paginateArgs';

@Injectable()
export class SavedService {
    constructor(
        @InjectRepository(Saved)
        private readonly savedRepository: Repository<Saved>,
    ) {}
    async create(createSavedInput: CreateSavedInput) {
        const saved = this.savedRepository.create({
            author: { _id: createSavedInput.authorId },
            news: { _id: createSavedInput.newsId },
        });
        return await this.savedRepository.save(saved);
    }

    async findAll(args?: PaginateArgs): Promise<Saved[]> {
        return await this.savedRepository.find({
            relations: { author: true },
            take: args.take,
            skip: args.skip,
        });
    }
    async findForCard(newsId: string, userId: string) {
        if (!userId) {
            return null;
        }
        const saved = await this.savedRepository.findOne({
            where: { news: { _id: newsId }, author: { _id: userId } },
            relations: { author: true },
        });
        return saved;
    }

    async findOne(id: string) {
        const saved = await this.savedRepository.findOne({ where: { _id: id }, relations: { author: true } });
        if (!saved) throw new NotFoundException('Saved with that id not found!');
        return saved;
    }

    update(id: number, updateSavedInput: UpdateSavedInput) {
        return `This action updates a #${id} saved`;
    }

    async remove(id: string) {
        const saved = await this.findOne(id);
        await this.savedRepository.delete({ _id: id });
        return saved;
    }
}
