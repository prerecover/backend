import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDoctorInput } from './dto/create-doctor.input';
import { UpdateDoctorInput } from './dto/update-doctor.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/countries/entities/country.entity';
import { Repository } from 'typeorm';
import { Doctor } from './entities/doctor.entity';
import { PaginateArgs } from 'src/common/args/paginateArgs';

@Injectable()
export class DoctorsService {
    constructor(
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
        @InjectRepository(Doctor)
        private readonly doctorRepository: Repository<Doctor>,
    ) {}
    async create(createDoctorInput: CreateDoctorInput) {
        const doctor = this.doctorRepository.create(createDoctorInput);
        return await this.doctorRepository.save(doctor);
    }

    async findAll(args: PaginateArgs): Promise<Doctor[]> {
        return await this.doctorRepository.find({
            relations: { country: true, clinic: true, services: true },
            take: args.take,
            skip: args.skip,
        });
    }

    async findByClinic(clinicId: string) {
        const doctors = await this.doctorRepository.find({
            where: { clinic: { _id: clinicId } },
            select: { _id: true, specialization: true, firstName: true, lastName: true, avatar: true },
        });
        if (!doctors) throw new NotFoundException('Service with that doctorId not found!');
        return doctors;
    }
    async findOne(id: string) {
        const doctor = await this.doctorRepository.findOne({
            where: { _id: id },
            relations: { country: true, clinic: true, services: true },
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
}
