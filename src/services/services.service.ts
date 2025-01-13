import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { Service } from './entities/service.entity';
import { CreateServiceInput } from './dto/create-service.input';
import { SelectServiceInput } from './dto/select-service.input';
import { ServiceCategory } from './entities/serviceCategory.entity';
import { categoryList } from 'src/config/data';

@Injectable()
export class ServicesService {
    constructor(
        @InjectRepository(Service)
        private readonly servicesRepository: Repository<Service>,
        @InjectRepository(ServiceCategory)
        private readonly serviceCategoriesRepository: Repository<ServiceCategory>,
    ) {
        this.serviceCategoriesRepository.find().then((list) => list.length === 0 && this.initCategories());
    }
    async create(createServiceInput: CreateServiceInput) {
        return this.servicesRepository.save(this.servicesRepository.create(createServiceInput));
    }
    async findAllServiceCategories(args: PaginateArgs): Promise<ServiceCategory[]> {
        return await this.serviceCategoriesRepository.find({
            take: args.take,
            skip: args.skip,
        });
    }
    async findOneServiceCategory(slug: string) {
        return await this.serviceCategoriesRepository.findOneBy({ slug: slug });
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

    // async selectService(selectServiceInput: SelectServiceInput) {
    //     const { countryTitle, startPrice, endPrice } = selectServiceInput;
    //     return await this.servicesRepository.find({
    //         where: { price: Between(startPrice, endPrice), clinic: { country: { title: countryTitle } } },
    //     });
    // }
    async findByClinic(clinicId: string) {
        const services = await this.servicesRepository.find({
            where: { clinic: { _id: clinicId } },
            relations: { clinic: true, news: true, doctors: true },
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
    // called on first init, don't use in smth other!!!
    async initCategories() {
        categoryList.forEach((el) => {
            this.serviceCategoriesRepository.save(this.serviceCategoriesRepository.create({ title: el.text }));
        });
    }
}
