import { Resolver, Query, Mutation, Args, ResolveField, Parent } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { CurrentUser } from 'src/common/shared/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TelegramService } from 'nestjs-telegram';
import { ModuleRef } from '@nestjs/core';
import { Survey } from 'src/surveys/entities/survey.entity';
import { SurveysService } from 'src/surveys/surveys.service';

@Resolver(() => Appointment)
export class AppointmentsResolver {
    constructor(
        private readonly appointmentsService: AppointmentsService,
        private readonly moduleRef: ModuleRef,
        private readonly surveyService: SurveysService,
    ) {}

    private telegram: TelegramService;

    onModuleInit() {
        this.telegram = this.moduleRef.get(TelegramService, { strict: false });
    }
    @UseGuards(AuthGuard)
    @Mutation(() => Appointment)
    async createAppointment(
        @CurrentUser() user: User,
        @Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput,
    ) {
        const appointment = await this.appointmentsService.create(createAppointmentInput, user._id);
        if (appointment) {
            this.telegram
                .sendMessage({
                    chat_id: '1034093866',
                    text: ` Создана новая запись! 
                    Название - ${appointment.title} 
                    Пользователь - ${appointment.user.firstName} ${appointment.user.lastName} ${appointment.user.surname}
                    Клиника - ${appointment.clinic.title}
        `,
                })
                .toPromise();
            return appointment;
        }
    }

    @Mutation(() => Appointment)
    async setStatusAppointment(
        @Args('appointmentId')
        appointmentId: string,
        @Args('status') status: string,
    ) {
        return await this.appointmentsService.setStatus(appointmentId, status);
    }

    @Mutation(() => Boolean)
    async changeDate(@Args('appointmentId') appointmentId: string, @Args('timeStart') timeStart: Date) {
        return await this.appointmentsService.changeDate(appointmentId, timeStart);
    }
    @ResolveField('survey', () => [Survey], { nullable: true })
    async survey(@Parent() appointment: Appointment) {
        const { _id: appointmentId } = appointment;
        return await this.surveyService.findByAppointment(appointmentId);
    }

    @UseGuards(AuthGuard)
    @Query(() => [Appointment], { name: 'appointments' })
    async findAll(@CurrentUser() user: User, @Args({ nullable: true }) args?: PaginateArgs) {
        return await this.appointmentsService.findAll(user._id, args);
    }

    @Query(() => [Appointment], { name: 'allAppointments' })
    async allAppointments(@Args('status', { nullable: true }) status?: string) {
        return await this.appointmentsService.allAppointments(status);
    }

    @Query(() => Appointment, { name: 'appointment' })
    async findOne(@Args('_id') _id: string) {
        return await this.appointmentsService.findOne(_id);
    }
}
