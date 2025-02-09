import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorInput } from './dto/create-doctor.input';
import { UpdateDoctorInput } from './dto/update-doctor.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/countries/entities/country.entity';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { DoctorSpecialization } from './entities/doctorSpecialization.entity';
import { specializationList } from 'src/config/data';

@Injectable()
export class DoctorsService {
    constructor(
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,
        @InjectRepository(DoctorSpecialization)
        private readonly doctorSpecializationRepository: Repository<DoctorSpecialization>,
    ) {
        this.doctorSpecializationRepository.find().then((list) => list.length === 0 && this.initSpecializations());
    }
    async create(createDoctorInput: CreateDoctorInput) {
        const { specialization, ...data } = createDoctorInput;
        const doctorSpecialization = await this.doctorSpecializationRepository.findOneBy({
            title: specialization,
        });
        const doctor = this.doctorRepository.create(data);
        doctor.specialization = doctorSpecialization;
        return await this.doctorRepository.save(doctor);
    }

    async findAll(args: PaginateArgs): Promise<Doctor[]> {
        return await this.doctorRepository.find({
            relations: { country: true, clinic: true, services: true, specialization: true },
            take: args.take,
            skip: args.skip,
        });
    }

    async findByClinic(clinicId: string) {
        const doctors = await this.doctorRepository.find({
            where: { clinic: { _id: clinicId } },
            relations: { specialization: true },
            select: { _id: true, firstName: true, lastName: true, avatar: true },
        });
        if (!doctors) throw new NotFoundException('Service with that doctorId not found!');
        return doctors;
    }
    async findForService(serviceId: string): Promise<Doctor[]> {
        const doctors = await this.doctorRepository.find({
            where: { services: { _id: serviceId } },
            relations: { specialization: true },
        });
        return doctors;
    }
    async findOne(id: string) {
        const doctor = await this.doctorRepository.findOne({
            where: { _id: id },
            relations: { country: true, clinic: true, services: true, specialization: true },
        });
        if (!doctor) throw new NotFoundException('Doctor with that id not found!');
        return doctor;
    }

    async update(id: number, updateDoctorInput: UpdateDoctorInput) {
        console.log(updateDoctorInput);
        return `This action updates a #${id} doctor`;
    }

    async remove(id: number) {
        return `This action removes a #${id} doctor`;
    }

    async findAllDoctorsSpecializations(args: PaginateArgs): Promise<DoctorSpecialization[]> {
        return await this.doctorSpecializationRepository.find({
            take: args.take,
            skip: args.skip,
        });
    }

    async initSpecializations() {
        specializationList.forEach((el) => {
            this.doctorSpecializationRepository.save(this.doctorSpecializationRepository.create({ title: el.text }));
        });
    }
}
