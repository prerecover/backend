import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { CurrentUser } from 'src/common/shared/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';

@Resolver(() => Appointment)
export class AppointmentsResolver {
    constructor(private readonly appointmentsService: AppointmentsService) {}

    @UseGuards(AuthGuard)
    @Mutation(() => Appointment)
    async createAppointment(
        @CurrentUser() user: User,
        @Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput,
    ) {
        return await this.appointmentsService.create(createAppointmentInput, user._id);
    }

    @UseGuards(AuthGuard)
    @Query(() => [Appointment], { name: 'appointments' })
    async findAll(@CurrentUser() user: User, @Args({ nullable: true }) args?: PaginateArgs) {
        return await this.appointmentsService.findAll(user._id, args);
    }

    @Query(() => Appointment, { name: 'appointment' })
    async findOne(@Args('_id') id: string) {
        return await this.appointmentsService.findOne(id);
    }

    @Mutation(() => Appointment)
    updateAppointment(@Args('updateAppointmentInput') updateAppointmentInput: UpdateAppointmentInput) {
        return this.appointmentsService.update(updateAppointmentInput.id, updateAppointmentInput);
    }

    @Mutation(() => Appointment)
    removeAppointment(@Args('id', { type: () => Int }) id: number) {
        return this.appointmentsService.remove(id);
    }
}
