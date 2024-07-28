import { Resolver, Query, Mutation, Args, Int, ID, ResolveField, Parent } from '@nestjs/graphql';
import { DoctorsService } from './doctors.service';
import { Doctor } from './entities/doctor.entity';
import { CreateDoctorInput } from './dto/create-doctor.input';
import { UpdateDoctorInput } from './dto/update-doctor.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { Service } from 'src/services/entities/service.entity';
import { ServicesService } from 'src/services/services.service';

@Resolver(() => Doctor)
export class DoctorsResolver {
    constructor(
        private readonly doctorsService: DoctorsService,
        private readonly servicesService: ServicesService,
    ) {}

    @Mutation(() => Doctor)
    async createDoctor(@Args('createDoctorInput') createDoctorInput: CreateDoctorInput) {
        return await this.doctorsService.create(createDoctorInput);
    }

    @Query(() => [Doctor], { name: 'doctors' })
    async findAll(@Args({ nullable: true }) args?: PaginateArgs) {
        return await this.doctorsService.findAll(args);
    }
    @ResolveField('services', () => [Service], { nullable: true })
    async services(@Parent() doctor: Doctor) {
        const { _id: doctorId } = doctor;
        return await this.servicesService.findByDoctor(doctorId);
    }
    @Query(() => [Doctor], { name: 'doctorsByClinic' })
    async findByClinic(@Args('clinicId') id: string) {
        return await this.doctorsService.findByClinic(id);
    }

    @Query(() => Doctor, { name: 'doctor' })
    async findOne(@Args('_id') id: string) {
        console.log(await this.doctorsService.findOne(id));
        return await this.doctorsService.findOne(id);
    }

    @Mutation(() => Doctor)
    async updateDoctor(@Args('updateDoctorInput') updateDoctorInput: UpdateDoctorInput) {
        return await this.doctorsService.update(updateDoctorInput.id, updateDoctorInput);
    }

    @Mutation(() => Doctor)
    async removeDoctor(@Args('id', { type: () => Int }) id: number) {
        return await this.doctorsService.remove(id);
    }
}
