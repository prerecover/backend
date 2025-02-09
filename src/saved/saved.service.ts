import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSavedInput } from './dto/create-saved.input';
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
        const { userId, clinicId, doctorId, serviceId } = createSavedInput;
        const saved = this.savedRepository.create({
            user: { _id: userId },
            clinic: clinicId && { _id: clinicId },
            doctor: doctorId && { _id: doctorId },
            service: serviceId && { _id: serviceId },
        });
        return await this.savedRepository.save(saved);
    }

    async findAll(userId: string, args?: PaginateArgs): Promise<Saved[]> {
        return await this.savedRepository.find({
            relations: { user: true, clinic: true, doctor: true, service: true, undergoing: true },
            where: { user: { _id: userId } },
            take: args.take,
            skip: args.skip,
        });
    }
    async savedForUser(userId: string) {
        return await this.savedRepository.find({
            where: { user: { _id: userId } },
            relations: { clinic: true, doctor: true, service: true },
        });
    }

    async findOne(id: string) {
        const saved = await this.savedRepository.findOne({
            where: { _id: id },
            relations: { user: true, clinic: true, doctor: true, service: true },
        });
        if (!saved) throw new NotFoundException('Saved with that id not found!');
        return saved;
    }

    async remove(id: string) {
        const saved = await this.findOne(id);
        await this.savedRepository.delete({ _id: id });
        return saved;
    }
    async removeArray(ids: string[]) {
        for (const id of ids) {
            await this.savedRepository.delete({ _id: id });
        }
    }
}
