import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClinicInput } from './dto/create-clinic.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { Clinic } from './entities/clinic.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SelectClinicInput } from './dto/select-clinic-input';
import { RegisterClinicInput } from './dto/registration/register-input';
import { Country } from 'src/countries/entities/country.entity';
import { Service } from 'src/services/entities/service.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { MinioService } from 'src/config/s3/minio.service';
import { TelegramService } from 'nestjs-telegram';
import { ModuleRef } from '@nestjs/core';
import { ClinicDetail } from './entities/clinicDetail.entity';
import { ServiceCategory } from 'src/services/entities/serviceCategory.entity';
import { UpdateClinicInput } from './dto/update-clinic.input';

@Injectable()
export class ClinicsService {
    constructor(
        @InjectRepository(Clinic)
        private readonly clinicRepository: Repository<Clinic>,
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>,
        @InjectRepository(ClinicDetail)
        private readonly clinicDetailRepository: Repository<ClinicDetail>,
        @InjectRepository(Service)
        private readonly serviceRepository: Repository<Service>,
        @InjectRepository(ServiceCategory)
        private readonly serviceCategoryRepository: Repository<ServiceCategory>,
        @InjectRepository(Doctor)
        private readonly doctorsRepository: Repository<Doctor>,
        @Inject()
        private readonly minioService: MinioService,
        private readonly moduleRef: ModuleRef,
    ) {}
    private telegram: TelegramService;

    onModuleInit() {
        this.telegram = this.moduleRef.get(TelegramService, { strict: false });
    }

    async update(updateClinicInput: UpdateClinicInput, clinicId: string) {
        const {
            countryName,
            city,
            registryNumber,
            age,
            square,
            numbers,
            language,
            adminNumber,
            computerHave,
            elevatorHave,
            internetHave,
            // mondayTime,
            // tuesdayTime,
            // wednesdayTime,
            // thursdayTime,
            // fridayTime,
            // sundayTime,
            // saturdayTime,
            totalDoctors,
            totalServices,
            numberOfFloors,
            address,
            title,
            typeTitle,
        } = updateClinicInput;
        const country = await this.countryRepository.findOneBy({ title: countryName });

        this.clinicDetailRepository.update(
            { clinic: { _id: clinicId } },
            {
                registryNumber,
                numberOfFloors,
                totalServices,
                totalDoctors,
                square,
                numbers,
                language,
                computerHave,
                elevatorHave,
                internetHave,
                adminNumber,
            },
        );
        await this.clinicRepository.update({ _id: clinicId }, { title, typeTitle, city, country, address, age });
        return await this.clinicRepository.findOneBy({ _id: clinicId });
    }

    async registerClinic(registerClinicInput: RegisterClinicInput) {
        const {
            services,
            countryName,
            registryNumber,
            square,
            numbers,
            language,
            adminNumber,
            computerHave,
            elevatorHave,
            internetHave,
            mondayTime,
            tuesdayTime,
            wednesdayTime,
            thursdayTime,
            fridayTime,
            sundayTime,
            saturdayTime,
            totalDoctors,
            totalServices,
            numberOfFloors,
            ...data
        } = registerClinicInput;
        let clinic = this.clinicRepository.create(data);
        const country = await this.countryRepository.findOneBy({ title: countryName });
        const detail = this.clinicDetailRepository.create({
            registryNumber,
            square,
            numbers,
            adminNumber,
            computerHave,
            language,
            elevatorHave,
            internetHave,
            mondayTime,
            tuesdayTime,
            wednesdayTime,
            thursdayTime,
            fridayTime,
            saturdayTime,
            sundayTime,
            totalDoctors,
            totalServices,
            numberOfFloors,
        });
        clinic.detail = detail;
        clinic.country = country;
        await this.clinicDetailRepository.save(detail);
        clinic = await this.clinicRepository.save(clinic);
        services.forEach(async (service) => {
            const { category: categoryTitle, doctors, ...serviceData } = service;
            const category = await this.serviceCategoryRepository.findOneBy({ title: categoryTitle });
            const serviceCreated = this.serviceRepository.create(serviceData);
            const doctorsArray: Doctor[] = [];
            doctors.forEach((doctor) => {
                const doctorCreated = this.doctorsRepository.create(doctor);
                doctorCreated.clinic = clinic;
                doctorsArray.push(doctorCreated);
            });
            serviceCreated.clinic = clinic;
            serviceCreated.doctors = doctorsArray;
            serviceCreated.category = category;
            this.serviceRepository.save(serviceCreated);
        });
        if (clinic) {
            this.telegram
                .sendMessage({
                    // chat_id: '595366190',
                    chat_id: '1034093866',
                    text: `Создана новая клиника! 
                    Название - ${clinic.title} 
                    Возраст клиники- ${clinic.age} лет
                    Досвидания Темур, хорошего дня!, жду 100$
        `,
                })
                .toPromise();
        }
        return clinic;
    }
    async create(createClinicInput: CreateClinicInput) {
        const clinic = this.clinicRepository.create(createClinicInput);
        return await this.clinicRepository.save(clinic);
    }
    async findAll(args?: PaginateArgs): Promise<Clinic[]> {
        return await this.clinicRepository.find({
            relations: { country: true, doctors: true, services: true },
            take: args.take,
            skip: args.skip,
        });
    }

    async selectClinic(selectClinicInput: SelectClinicInput) {
        const { countryTitle, online, offline } = selectClinicInput;
        return await this.clinicRepository.find({
            where: { services: { online: online, offline: offline }, country: { title: countryTitle } },
            select: { _id: true, title: true },
        });
    }

    async findForService(serviceId: string): Promise<Clinic> {
        const clinic = await this.clinicRepository.findOne({
            where: { services: { _id: serviceId } },
            relations: { country: true, doctors: true },
        });
        return clinic;
    }
    async findDetailByClinic(clinicId: string): Promise<ClinicDetail> {
        return await this.clinicDetailRepository.findOne({ where: { clinic: { _id: clinicId } } });
    }
    async findByDoctor(doctorId: string): Promise<Clinic> {
        const clinic = await this.clinicRepository.findOne({
            where: { doctors: { _id: doctorId } },
            relations: { country: true, doctors: true },
        });
        return clinic;
    }
    async findOne(id: string) {
        const clinic = await this.clinicRepository.findOne({
            where: { _id: id },
            relations: { country: true, doctors: true, news: true, appointments: true, services: true },
        });
        if (!clinic) throw new NotFoundException('Clinic with that id not found!');
        return clinic;
    }
}
