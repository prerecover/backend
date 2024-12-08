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
import { Link } from 'src/clinics/links/entities/link.entity';
import { AdminStats } from './dto/admin-stats';

@Injectable()
export class StatisticService {
    constructor(
        @InjectRepository(Clinic)
        private readonly clinicRepository: Repository<Clinic>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        @InjectRepository(Link)
        private readonly linkRepository: Repository<Link>,
        @InjectRepository(Survey)
        private readonly surveyRepository: Repository<Survey>,
    ) {}
    oneDay = new Date(Date.now() - 24 * 60 * 60 * 1000);
    week = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    async getAppointmentStats(chunk: number): Promise<AppointmentStats> {
        const totalAppointments = await this.appointmentRepository.count({
            where: { timeStart: MoreThan(chunk == 1 ? this.oneDay : this.week) },
        });
        const completedAppointments = await this.appointmentRepository.count({
            where: { status: 'Approoved', timeStart: LessThan(chunk == 1 ? this.oneDay : this.week) },
        });
        const acceptedAppointments = await this.appointmentRepository.count({
            where: { status: 'Approoved', timeStart: MoreThan(chunk == 1 ? this.oneDay : this.week) },
        });
        const rejectedAppointments = await this.appointmentRepository.count({
            where: { status: 'Rejected', timeStart: MoreThan(chunk == 1 ? this.oneDay : this.week) },
        });

        return { totalAppointments, completedAppointments, acceptedAppointments, rejectedAppointments };
    }

    async getAdminStats(chunk: number): Promise<AdminStats> {
        const { acceptedAppointments } = await this.getAppointmentStats(chunk);
        const pendingAppointments = await this.appointmentRepository.count({
            where: { status: 'Pending', timeStart: MoreThan(chunk == 1 ? this.oneDay : this.week) },
        });
        const inProcessAppointments = await this.appointmentRepository.count({
            where: { status: 'In process', timeStart: MoreThan(chunk == 1 ? this.oneDay : this.week) },
        });
        const inProcessSurveys = await this.surveyRepository.count({
            where: { passed: false, createdAt: MoreThan(chunk == 1 ? this.oneDay : this.week) },
        });
        return {
            approovedAppointments: acceptedAppointments,
            pendingAppointments,
            inProcessAppointments,
            inProcessSurveys,
        };
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
        const totalUsers = await this.userRepository.count({});
        const createdSurvey = await this.surveyRepository.count({
            where: { createdAt: MoreThan(chunk == 1 ? this.oneDay : this.week) },
        });
        const passedSurvey = await this.surveyRepository.count({
            where: { createdAt: MoreThan(chunk == 1 ? this.oneDay : this.week), passed: true },
        });
        return {
            totalCreatedUsers,
            totalUsers,
            totalDeletedUsers,
            completedSurvey: passedSurvey,
        };
    }

    async siteWork(chunk: number): Promise<StatsOutput> {
        const userStats = await this.getUserStats(chunk);
        const appointmentStats = await this.getAppointmentStats(chunk);
        const clinicStats = await this.getClinicStats(chunk);
        const adminStats = await this.getAdminStats(chunk);
        return {
            users: userStats,
            appointments: appointmentStats,
            clinics: clinicStats,
            admin: adminStats,
        };
    }
}
