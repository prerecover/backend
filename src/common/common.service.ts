import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Service } from 'src/services/entities/service.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommonService {
    constructor(
        @InjectRepository(Clinic)
        private readonly clinicRepository: Repository<Clinic>,
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,
        @InjectRepository(Service)
        private readonly serviceRepository: Repository<Service>,
    ) {}

    async search() {
        const clinics = await this.clinicRepository.find({ relations: { country: true } });
        const doctors = await this.doctorRepository.find({ relations: { country: true } });
        const services = await this.serviceRepository.find({ relations: { doctors: true, clinic: true } });
        return { clinics, doctors, services };
    }
}
