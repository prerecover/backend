import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { UndergoingsService } from './undergoings.service';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Undergoing } from './entities/undergoing.entity';
import { AppointmentsService } from 'src/appointments/appointments.service';
import { PaginateArgs } from 'src/common/args/paginateArgs';

@Resolver(() => Undergoing)
export class UndergoingsResolver {
    constructor(
        private readonly undergoingsService: UndergoingsService,
        private readonly appointmentsService: AppointmentsService,
    ) {}

    @ResolveField('appointment', () => Appointment, { nullable: true })
    async appointment(@Parent() undergoing: Undergoing) {
        const { _id: undergoingId } = undergoing;
        return await this.appointmentsService.findByUndergoing(undergoingId);
    }
    @Query(() => [Undergoing], { name: 'undergoings' })
    async findAll(@Args({ nullable: true }) args?: PaginateArgs) {
        return await this.undergoingsService.findAll(args);
    }
    @Query(() => [Undergoing], { name: 'undergoings' })
    async findByDoctor(@Args({ nullable: true }) args?: PaginateArgs) {
        return await this.undergoingsService.findAll(args);
    }
}
