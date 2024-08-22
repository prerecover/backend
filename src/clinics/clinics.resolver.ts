import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { ClinicsService } from './clinics.service';
import { Clinic } from './entities/clinic.entity';
import { CreateClinicInput } from './dto/create-clinic.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { SelectClinicInput } from './dto/select-clinic-input';
import { Service } from 'src/services/entities/service.entity';
import { ServicesService } from 'src/services/services.service';
import { News } from 'src/news/entities/news.entity';
import { NewsService } from 'src/news/news.service';
import { RegisterClinicInput } from './dto/registration/register-input';

@Resolver(() => Clinic)
export class ClinicsResolver {
    constructor(
        private readonly clinicsService: ClinicsService,
        private readonly servicesService: ServicesService,
        private readonly newsService: NewsService,
    ) { }

    @Mutation(() => Clinic)
    async registerClinic(@Args('registerClinicInput') registerClinicInput: RegisterClinicInput) {
        console.log(registerClinicInput.services)
        return await this.clinicsService.registerClinic(registerClinicInput)
    }

    @Mutation(() => Clinic)
    async createClinic(@Args('createClinicInput') createClinicInput: CreateClinicInput) {
        return await this.clinicsService.create(createClinicInput);
    }

    @Query(() => [Clinic], { name: 'clinics' })
    async findAll(@Args({ nullable: true }) args?: PaginateArgs) {
        return await this.clinicsService.findAll(args);
    }

    @Query(() => Clinic, { name: 'clinic' })
    async findOne(@Args('_id') id: string) {
        return await this.clinicsService.findOne(id);
    }

    @Mutation(() => [Clinic], { name: 'selectClinics' })
    async selectClinics(@Args('selectClinicInput') selectClinicInput: SelectClinicInput) {
        return await this.clinicsService.selectClinic(selectClinicInput);
    }

    @ResolveField('services', () => [Service])
    async clinic(@Parent() clinic: Clinic) {
        const { _id: clinicId } = clinic;
        return await this.servicesService.findByClinic(clinicId);
    }

    @ResolveField('news', () => [News])
    async news(@Parent() clinic: Clinic) {
        const { _id: clinicId } = clinic;
        return await this.newsService.findByClinic(clinicId);
    }
}
