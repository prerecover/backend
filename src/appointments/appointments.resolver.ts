import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
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
import { AppointmentKeyboard } from 'src/common/tg-keyboards/keyboard';

@Resolver(() => Appointment)
export class AppointmentsResolver {
    constructor(
        private readonly appointmentsService: AppointmentsService,
        private readonly moduleRef: ModuleRef,
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

    @UseGuards(AuthGuard)
    @Query(() => [Appointment], { name: 'appointments' })
    async findAll(@CurrentUser() user: User, @Args({ nullable: true }) args?: PaginateArgs) {
        return await this.appointmentsService.findAll(user._id, args);
    }

    @Query(() => Appointment, { name: 'appointment' })
    async findOne(@Args('_id') id: string) {
        return await this.appointmentsService.findOne(id);
    }
}
