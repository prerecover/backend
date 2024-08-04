import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateClinicInput } from './dto/create-clinic.input';
import { UpdateClinicInput } from './dto/update-clinic.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { Clinic } from './entities/clinic.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ClinicsService {
    constructor(
        @InjectRepository(Clinic)
        private readonly clinicRepository: Repository<Clinic>,
    ) {}
    async create(createClinicInput: CreateClinicInput) {
        const clinic = this.clinicRepository.create(createClinicInput);
        return await this.clinicRepository.save(clinic);
    }

    async findAll(args?: PaginateArgs): Promise<Clinic[]> {
        return await this.clinicRepository.find({
            relations: { country: true, doctors: true, services: true },
            take: args.take,
            skip: args.skip,
        });
    }
    async findForService(serviceId: string): Promise<Clinic> {
        const clinic = await this.clinicRepository.findOne({
            where: { services: { _id: serviceId } },
            relations: { country: true, doctors: true },
        });
        return clinic;
    }
    async findOne(id: string) {
        const clinic = await this.clinicRepository.findOne({
            where: { _id: id },
            relations: { country: true, doctors: true, news: true, appointments: true, services: true },
        });
        if (!clinic) throw new NotFoundException('Clinic with that id not found!');
        return clinic;
    }

    update(id: number, updateClinicInput: UpdateClinicInput) {
        return `This action updates a #${id} clinic`;
    }

    remove(id: number) {
        return `This action removes a #${id} clinic`;
    }
}
