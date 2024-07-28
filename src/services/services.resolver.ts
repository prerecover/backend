import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ServicesService } from './services.service';
import { Service } from './entities/service.entity';
import { CreateServiceInput } from './dto/create-service.input';
import { UpdateServiceInput } from './dto/update-service.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';

@Resolver(() => Service)
export class ServicesResolver {
    constructor(private readonly servicesService: ServicesService) {}

    @Mutation(() => Service)
    async createService(@Args('createServiceInput') createServiceInput: CreateServiceInput) {
        return await this.servicesService.create(createServiceInput);
    }

    @Query(() => [Service], { name: 'services' })
    async findAll(@Args({ nullable: true }) args?: PaginateArgs) {
        return this.servicesService.findAll(args);
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
