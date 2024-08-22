import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { Service } from './entities/service.entity';
import { CreateServiceInput } from './dto/create-service.input';
import { SelectServiceInput } from './dto/select-service.input';

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Service)
        private readonly servicesRepository: Repository<Service>,
    ) {}
    async create(createServiceInput: CreateServiceInput) {
        return this.servicesRepository.save(this.servicesRepository.create(createServiceInput));
    }

    async findAll(args: PaginateArgs): Promise<Service[]> {
        return await this.servicesRepository.find({
            relations: { clinic: true, news: true, doctors: true },
            take: args.take,
            skip: args.skip,
        });
    }

    async findOne(id: string) {
        const service = await this.servicesRepository.findOne({
            where: { _id: id },
            relations: { clinic: true, news: true, doctors: true },
        });
        if (!service) throw new NotFoundException('Service with that id not found!');
        return service;
    }

    async selectService(selectServiceInput: SelectServiceInput) {
        const { countryTitle, startPrice, endPrice } = selectServiceInput;
        return await this.servicesRepository.find({
            where: { price: Between(startPrice, endPrice), clinic: { country: { title: countryTitle } } },
        });
    }
    async findByClinic(clinicId: string) {
        const services = await this.servicesRepository.find({
            where: { clinic: { _id: clinicId } },
            relations: { clinic: true, news: true, doctors: true },
            select: {
                news: { _id: true },
                doctors: { _id: true, firstName: true, lastName: true, surname: true, avatar: true },
            },
        });
        if (!services) throw new NotFoundException('Service with that clinicId not found!');
        return services;
    }
    async findByDoctor(doctorId: string) {
        const services = await this.servicesRepository.find({
            where: { doctors: { _id: doctorId } },
            relations: { clinic: true, news: true, doctors: true },
            select: { doctors: { _id: true, firstName: true, lastName: true, surname: true } },
        });
        if (!services) throw new NotFoundException('Service with that doctorId not found!');
        return services;
    }
}
