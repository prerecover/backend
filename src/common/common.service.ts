import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Service } from 'src/services/entities/service.entity';
import { Repository } from 'typeorm';
import { History } from './obj-types/history';
import { Survey } from 'src/surveys/entities/survey.entity';

@Injectable()
export class CommonService {
    constructor(
        @InjectRepository(Clinic)
        private readonly clinicRepository: Repository<Clinic>,
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,
        @InjectRepository(Service)
        private readonly serviceRepository: Repository<Service>,
        @InjectRepository(Appointment)
        private readonly appointmentRepository: Repository<Appointment>,
        @InjectRepository(Survey)
        private readonly surveyRepository: Repository<Survey>,
    ) {}

    async search() {
        const clinics = await this.clinicRepository.find({ relations: { country: true } });
        const doctors = await this.doctorRepository.find({ relations: { country: true } });
        const services = await this.serviceRepository.find({ relations: { doctors: true, clinic: true } });
        return { clinics, doctors, services };
    }
    async history(userId: string): Promise<History> {
        const appointments = await this.appointmentRepository.find({
            relations: { doctor: true, clinic: true, service: true, availableDates: true },
            where: { user: { _id: userId } },
        });
        const surveys = await this.surveyRepository.find({
            where: { appointment: { user: { _id: userId } } },
            relations: { appointment: true, questions: true },
        });
        return { appointments, surveys };
    }
}
