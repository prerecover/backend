import { Module } from '@nestjs/common';
import { StatisticService } from './statistic.service';
import { StatisticResolver } from './statistic.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { User } from 'src/users/entities/user.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Clinic, Appointment, User])],
    providers: [StatisticResolver, StatisticService],
})
export class StatisticModule { }
