import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Undergoing } from './entities/undergoing.entity';
import { PaginateArgs } from 'src/common/args/paginateArgs';

@Injectable()
export class UndergoingsService {
    constructor(
        @InjectRepository(Undergoing)
        private readonly undergoingRepository: Repository<Undergoing>,
    ) {}
    async findAll(args?: PaginateArgs): Promise<Undergoing[]> {
        return await this.undergoingRepository.find({});
    }
    async findOne(id: string): Promise<Undergoing> {
        return await this.undergoingRepository.findOne({ where: { _id: id } });
    }
    async findByService(id: string) {
        const undergoing = await this.undergoingRepository.find({
            where: { appointment: { service: { _id: id } } },
        });
        return undergoing;
    }
    async findByDoctor(id: string) {
        const undergoing = await this.undergoingRepository.find({
            where: { appointment: { doctor: { _id: id } } },
        });
        return undergoing;
    }
}
