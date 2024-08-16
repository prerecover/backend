import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AppointmentsService } from './appointments.service';
import { Appointment } from './entities/appointment.entity';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { UpdateAppointmentInput } from './dto/update-appointment.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { CurrentUser } from 'src/common/shared/user.decorator';
import { User } from 'src/users/entities/user.entity';
import { Inject, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { TelegramService } from 'nestjs-telegram';
import { ModuleRef } from '@nestjs/core';

@Resolver(() => Appointment)
export class AppointmentsResolver {
    constructor(private readonly appointmentsService: AppointmentsService, private readonly moduleRef: ModuleRef) { }

    private telegram: TelegramService

    onModuleInit() {
        this.telegram = this.moduleRef.get(TelegramService, { strict: false })
    }
    @UseGuards(AuthGuard)
    @Mutation(() => Appointment)
    async createAppointment(
        @CurrentUser() user: User,
        @Args('createAppointmentInput') createAppointmentInput: CreateAppointmentInput,
    ) {
        const appointment = await this.appointmentsService.create(createAppointmentInput, user._id);
        const data = await this.telegram.sendMessage({ text: "Hello", chat_id: "595366190" }).toPromise()
        this.telegram.sendMessage({
            chat_id: "1034093866", text: ` Создана новая запись! 
        Название - ${appointment.title} 
        Пользователь - ${appointment.user.firstName} ${appointment.user.lastName} ${appointment.user.surname}
        Клиника - ${appointment.clinic.title}
        `
        }).toPromise()
        console.log(data)
        console.log(appointment)
        return appointment

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
