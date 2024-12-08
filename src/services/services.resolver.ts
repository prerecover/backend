import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ServicesService } from './services.service';
import { Service } from './entities/service.entity';
import { CreateServiceInput } from './dto/create-service.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { News } from 'src/news/entities/news.entity';
import { NewsService } from 'src/news/news.service';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { ClinicsService } from 'src/clinics/clinics.service';
import { SelectServiceInput } from './dto/select-service.input';
import { ServiceCategory } from './entities/serviceCategory.entity';

@Resolver(() => Service)
export class ServicesResolver {
    constructor(
        private readonly servicesService: ServicesService,
        private readonly newsService: NewsService,
        private readonly clinicService: ClinicsService,
    ) {}

    @Query(() => [ServiceCategory], { name: 'serviceCategories' })
    async findAllServiceCategories(@Args({ nullable: true }) args?: PaginateArgs) {
        return await this.servicesService.findAllServiceCategories(args);
    }

    @Query(() => [ServiceCategory], { name: 'serviceCategory' })
    async findOneServiceCategory(@Args('slug') slug: string) {
        return await this.servicesService.findOneServiceCategory(slug);
    }
    @Mutation(() => Service)
    async createService(@Args('createServiceInput') createServiceInput: CreateServiceInput) {
        return await this.servicesService.create(createServiceInput);
    }

    @Query(() => [Service], { name: 'services' })
    async findAll(@Args({ nullable: true }) args?: PaginateArgs) {
        return this.servicesService.findAll(args);
    }

    @ResolveField('clinic', () => Clinic)
    async clinic(@Parent() service: Service) {
        const { _id: serviceId } = service;
        return await this.clinicService.findForService(serviceId);
    }

    @Mutation(() => [Service], { name: 'selectServices' })
    async selectServices(@Args('selectServiceInput') selectServiceInput: SelectServiceInput) {
        return await this.servicesService.selectService(selectServiceInput);
    }

    @ResolveField('news', () => [News], { nullable: true })
    async news(@Parent() service: Service) {
        const { _id: serviceId } = service;
        return await this.newsService.findForService(serviceId);
    }

    @Query(() => Service, { name: 'service' })
    async findOne(@Args('_id') id: string) {
        return await this.servicesService.findOne(id);
    }
    @Query(() => [Service], { name: 'servicesByClinic' })
    async findByClinic(@Args('clinicId') id: string) {
        return await this.servicesService.findByClinic(id);
    }
}
