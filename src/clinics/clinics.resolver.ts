import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClinicsService } from './clinics.service';
import { Clinic } from './entities/clinic.entity';
import { CreateClinicInput } from './dto/create-clinic.input';
import { UpdateClinicInput } from './dto/update-clinic.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';

@Resolver(() => Clinic)
export class ClinicsResolver {
    constructor(private readonly clinicsService: ClinicsService) {}

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

    @Mutation(() => Clinic)
    updateClinic(@Args('updateClinicInput') updateClinicInput: UpdateClinicInput) {
        return this.clinicsService.update(updateClinicInput.id, updateClinicInput);
    }

    @Mutation(() => Clinic)
    removeClinic(@Args('id', { type: () => Int }) id: number) {
        return this.clinicsService.remove(id);
    }
}
