import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAppointmentInput } from './dto/create-appointment.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { Appointment } from './entities/appointment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Service } from 'src/services/entities/service.entity';

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
    ) {}
    async create(createAppointmentInput: CreateAppointmentInput, userId: string) {
        const { clinicId, doctorId, serviceId } = createAppointmentInput;
        const appointment = this.appointmentsRepository.create(createAppointmentInput);
        const service = await this.servicesRepository.findOneBy({ _id: serviceId });
        const doctor = await this.doctorsRepository.findOneBy({ _id: doctorId });
        const clinic = await this.clinicsRepository.findOneBy({ _id: clinicId });
        const user = await this.usersRepository.findOneBy({ _id: userId });
        appointment.service = service;
        appointment.clinic = clinic;
        appointment.doctor = doctor;
        appointment.user = user;
        return await this.appointmentsRepository.save(appointment);
    }
    async findAll(userId: string, args?: PaginateArgs): Promise<Appointment[]> {
        return await this.appointmentsRepository.find({
            where: { user: { _id: userId } },
            relations: { user: true, clinic: true, doctor: true, service: true },
            take: args.take,
            skip: args.skip,
        });
    }

    async findOne(id: string) {
        const appointment = await this.appointmentsRepository.findOne({
            where: { _id: id },
            relations: { user: true, doctor: true, clinic: true, service: true },
        });
        if (!appointment) throw new NotFoundException('Appointment with that id not found!');
        return appointment;
    }
}
