import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { User } from 'src/users/entities/user.entity';
import { IsNull, LessThan, MoreThan, Not, Repository } from 'typeorm';
import { StatsOutput } from './dto/main';
import { UsersStats } from './dto/users-stats';
import { AppointmentStats } from './dto/appointment-stats';
import { ClinicStats } from './dto/clinic-stats';
import { Survey } from 'src/surveys/entities/survey.entity';

@Injectable()
export class StatisticService {
    constructor(
        @InjectRepository(Clinic)
        private readonly clinicRepository: Repository<Clinic>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        @InjectRepository(Survey)
        private readonly surveyRepository: Repository<Survey>,
    ) { }
    oneDay = new Date(Date.now() - 24 * 60 * 60 * 1000);
    week = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    async getAppointmentStats(chunk: number): Promise<AppointmentStats> {
        const totalAppointments = await this.appointmentRepository.count({
            where: { timeStart: MoreThan(chunk == 1 ? this.oneDay : this.week) },
        });
        const completedAppointments = await this.appointmentRepository.count({
            where: { status: 'Accepted', timeStart: LessThan(chunk == 1 ? this.oneDay : this.week) },
        });
        const acceptedAppointments = await this.appointmentRepository.count({
            where: { status: 'Accepted', timeStart: MoreThan(chunk == 1 ? this.oneDay : this.week) },
        });
        const rejectedAppointments = await this.appointmentRepository.count({
            where: { status: 'Rejected', timeStart: MoreThan(chunk == 1 ? this.oneDay : this.week) },
        });

        return { totalAppointments, completedAppointments, acceptedAppointments, rejectedAppointments };
    }

    async getClinicStats(chunk: number): Promise<ClinicStats> {
        const totalClinics = await this.clinicRepository.count({
            where: { createdAt: MoreThan(chunk == 1 ? this.oneDay : this.week) },
        });
        const totalDeleted = await this.clinicRepository.count({
            where: { deletedAt: Not(IsNull()) && MoreThan(chunk == 1 ? this.oneDay : this.week) },
        });
        const totalCreated = await this.clinicRepository.count({
            where: { createdAt: MoreThan(chunk == 1 ? this.oneDay : this.week), deletedAt: IsNull() },
        });
        return { totalClinics, totalCreated, totalDeleted };
    }

    async getUserStats(chunk: number): Promise<UsersStats> {
        const totalCreatedUsers = await this.userRepository.count({
            where: { createdAt: MoreThan(chunk == 1 ? this.oneDay : this.week) },
        });
        const totalDeletedUsers = await this.userRepository.count({
            where: { deletedAt: Not(IsNull()) && MoreThan(chunk == 1 ? this.oneDay : this.week) },
        });
        const createdSurvey = await this.surveyRepository.count({
            where: { createdAt: MoreThan(chunk == 1 ? this.oneDay : this.week) },
        });
        return {
            totalCreatedUsers,
            totalDeletedUsers,
            createdSurvey: createdSurvey,
            completedSurvey: 0,
        };
    }

    async siteWork(chunk: number): Promise<StatsOutput> {
        const userStats = await this.getUserStats(chunk);
        const appointmentStats = await this.getAppointmentStats(chunk);
        const clinicStats = await this.getClinicStats(chunk);
        return { users: userStats, appointments: appointmentStats, clinics: clinicStats };
    }
}
