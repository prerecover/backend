import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { SavedService } from './saved.service';
import { Saved } from './entities/saved.entity';
import { CreateSavedInput } from './dto/create-saved.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from 'src/common/shared/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { ClinicsService } from 'src/clinics/clinics.service';
import { DoctorsService } from 'src/doctors/doctors.service';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Service } from 'src/services/entities/service.entity';
import { ServicesService } from 'src/services/services.service';

@Resolver(() => Saved)
export class SavedResolver {
    constructor(
        private readonly savedService: SavedService,
        private readonly clinicService: ClinicsService,
        private readonly servicesService: ServicesService,
    ) { }

    @Mutation(() => Saved)
    // @UseGuards(AuthGuard)
    async createSaved(@Args('createSavedInput') createSavedInput: CreateSavedInput) {
        return await this.savedService.create(createSavedInput);
    }

    @UseGuards(AuthGuard)
    @Query(() => [Saved], { name: 'savedAll' })
    async findAll(@CurrentUser() user: User, @Args({ nullable: true }) args?: PaginateArgs) {
        return this.savedService.findAll(user._id, args);
    }

    @ResolveField('clinic', () => Clinic, { nullable: true })
    async clinic(@Parent() saved: Saved) {
        const { clinic } = saved;
        if (clinic) return await this.clinicService.findOne(clinic._id);
        else return null;
    }
    @ResolveField('service', () => Service, { nullable: true })
    async service(@Parent() saved: Saved) {
        const { service } = saved;
        if (service) return await this.servicesService.findOne(service._id);
        else return null;
    }
    @Query(() => Saved, { name: 'saved' })
    findOne(@Args('_id') _id: string) {
        return this.savedService.findOne(_id);
    }

    @Mutation(() => Saved)
    async removeSaved(@Args('_id') _id: string) {
        return await this.savedService.remove(_id);
    }
}
