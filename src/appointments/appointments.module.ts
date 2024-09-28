import { Module } from '@nestjs/common';
import { AppointmentsService } from './appointments.service';
import { AppointmentsResolver } from './appointments.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Appointment } from './entities/appointment.entity';
import { UsersModule } from 'src/users/users.module';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Service } from 'src/services/entities/service.entity';
import { User } from 'src/users/entities/user.entity';
import { AvailableDatesModule } from './available_dates/available_dates.module';
import { AvailableDate } from './available_dates/entities/availableDate.entity';
import { NotificationsModule } from 'src/notifications/notifications.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Appointment, Clinic, Doctor, Service, User, AvailableDate]),
        UsersModule,
        NotificationsModule,
        AvailableDatesModule,
    ],
    providers: [AppointmentsResolver, AppointmentsService],
    exports: [AppointmentsService],
})
export class AppointmentsModule {}
