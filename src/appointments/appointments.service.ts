import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Not, Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Service } from 'src/services/entities/service.entity';
import { AvailableDate } from './available_dates/entities/availableDate.entity';
import { NotificationsService } from 'src/notifications/notifications.service';
import { LokiLogger } from 'nestjs-loki-logger';
import { Transactional } from 'typeorm-transactional';
import { InjectQueue } from '@nestjs/bull';
import { QUEUE_NAME } from 'src/config/bull/queue.interface';
import { Queue } from 'bull';

@Injectable()
export class AppointmentsService {
    constructor(
        @InjectRepository(Appointment)
        private readonly appointmentsRepository: Repository<Appointment>,
        @InjectRepository(Clinic)
        private readonly clinicsRepository: Repository<Clinic>,
        @InjectRepository(Doctor)
        private readonly doctorsRepository: Repository<Doctor>,
        @InjectRepository(Service)
        private readonly servicesRepository: Repository<Service>,
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        @InjectRepository(AvailableDate)
        private readonly dateRepository: Repository<AvailableDate>,
        private readonly notificationService: NotificationsService,
        @InjectQueue(QUEUE_NAME.sms) private readonly smsQueue: Queue,
    ) {}
    private readonly logger = new LokiLogger(AppointmentsService.name);

    @Transactional()
    async create(createAppointmentInput: CreateAppointmentInput, userId: string) {
        const { clinicId, doctorId, serviceId } = createAppointmentInput;
        const appointment = this.appointmentsRepository.create(createAppointmentInput);
        const service = await this.servicesRepository.findOneBy({ _id: serviceId });
        const doctor = await this.doctorsRepository.findOneBy({ _id: doctorId });
        const clinic = await this.clinicsRepository.findOneBy({ _id: clinicId });
        const user = await this.usersRepository.findOneBy({ _id: userId });
        service.treated += 1;
        await this.servicesRepository.save(service);
        appointment.service = service;
        appointment.clinic = clinic;

        appointment.doctor = doctor;
        appointment.user = user;
        const createdAppointment = await this.appointmentsRepository.save(appointment);
        this.notificationService.create({
            userId: appointment.user._id,
            text: `Создана запись “${createdAppointment.title || 'Без названия'}” на ${new Date(createdAppointment.timeStart).getDate()}.${new Date(createdAppointment.timeStart).getMonth() + 1}.${new Date(createdAppointment.timeStart).getFullYear()}`,
        });
        return createdAppointment;
    }
    async findAll(userId: string, args?: PaginateArgs): Promise<Appointment[]> {
        const appointments = await this.appointmentsRepository.find({
            where: { user: { _id: userId }, status: Not('Rejected') },
            relations: { user: true, clinic: true, doctor: true, service: true, survey: true, availableDates: true },
            take: args.take,
            skip: args.skip,
        });
        this.logger.log(appointments.toString());
        return appointments;
    }

    async allAppointments(status?: string): Promise<Appointment[]> {
        const appointments = await this.appointmentsRepository.find({
            relations: { user: true, clinic: true, doctor: true, service: true, survey: true, availableDates: true },
            where: { status: status || In(['In process', 'Pending', 'Rejected', 'Approoved']) },
        });
        this.logger.log(appointments.toString());
        return appointments;
    }

    async setStatus(appointmentId: string, status: 'Approoved' | 'Rejected' | 'In process' | 'Pending') {
        const appointment = await this.findOne(appointmentId);
        appointment.status = status;
        await this.smsQueue.add('changeAppointmentStatus', {
            number: appointment.user.number,
            appointmentTitle: appointment.title || 'Без названия',
            status: status,
        });
        this.logger.log(appointment.toString());
        return await this.appointmentsRepository.save(appointment);
    }

    @Transactional()
    async changeDate(appointmentId: string, timeStart: Date) {
        const appointment = await this.findOne(appointmentId);
        appointment.timeStart = timeStart;
        appointment.status = 'In process';
        await this.dateRepository.delete({ appointment: appointment });
        await this.appointmentsRepository.save(appointment);
        this.logger.log(`Дата записи изменена, статус - "В процессе" ${appointment}`);
        return true;
    }

    async findByUndergoing(id: string) {
        const appointment = await this.appointmentsRepository.findOne({
            where: { undergoings: { _id: id } },
            relations: { user: true, doctor: true, clinic: true, service: true, survey: true },
        });
        return appointment;
    }
    async findByService(id: string) {
        const appointment = await this.appointmentsRepository.find({
            where: { service: { _id: id } },
            relations: { user: true, doctor: true, clinic: true, service: true, survey: true },
        });
        return appointment;
    }
    async findByDoctor(id: string) {
        const appointment = await this.appointmentsRepository.find({
            where: { doctor: { _id: id } },
            relations: { user: true, doctor: true, clinic: true, service: true, survey: true, undergoings: true },
        });
        return appointment;
    }
    async findOne(id: string) {
        const appointment = await this.appointmentsRepository.findOne({
            where: { _id: id },
            relations: { user: true, doctor: true, clinic: true, service: true, survey: true },
        });
        if (!appointment) {
            this.logger.error('Appointment with that id not found!');
            throw new NotFoundException('Appointment with that id not found!');
        }
        this.logger.log(appointment.toString());
        return appointment;
    }
}
