import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { ClinicsService } from 'src/clinics/clinics.service';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { CurrentUser } from 'src/common/shared/user.decorator';
import { Service } from 'src/services/entities/service.entity';
import { ServicesService } from 'src/services/services.service';
import { User } from 'src/users/entities/user.entity';
import { CreateSavedInput } from './dto/create-saved.input';
import { Saved } from './entities/saved.entity';
import { SavedService } from './saved.service';
import { Undergoing } from 'src/undergoings/entities/undergoing.entity';
import { UndergoingsService } from 'src/undergoings/undergoings.service';

@Resolver(() => Saved)
export class SavedResolver {
    constructor(
        private readonly savedService: SavedService,
        private readonly clinicService: ClinicsService,
        private readonly servicesService: ServicesService,
        private readonly undergoingService: UndergoingsService,
    ) {}

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
    @ResolveField('undergoing', () => Undergoing, { nullable: true })
    async undergoing(@Parent() saved: Saved) {
        const { undergoing } = saved;
        if (undergoing) return await this.undergoingService.findOne(undergoing._id);
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
    @Mutation(() => Boolean, { nullable: true })
    async removeSavedArray(@Args('ids', { type: () => [String] }) ids: string[]) {
        return await this.savedService.removeArray(ids);
    }
}
