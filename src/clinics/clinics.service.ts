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
        const { countryName, detail, avatar, services, ...data } = updateClinicInput;
        const country = await this.countryRepository.findOneBy({ title: countryName });
        this.clinicDetailRepository.update({ clinic: { _id: clinicId } }, detail);
        await this.clinicRepository.update({ _id: clinicId }, { country: country, ...data });
        return await this.clinicRepository.findOneBy({ _id: clinicId });
    }
    async registerClinic(registerClinicInput: RegisterClinicInput) {
        const { services, countryName, detail, avatar, ...data } = registerClinicInput;

        // Создание клиники и зависимостей
        const clinic = this.clinicRepository.create(data);
        const [country, clinicDetail, avatarPath] = await Promise.all([
            this.countryRepository.findOneBy({ title: countryName }),
            this.clinicDetailRepository.save(this.clinicDetailRepository.create(detail)),
            this.minioService.uploadFile(await avatar, 'clinics_images'),
        ]);

        clinic.detail = clinicDetail;
        clinic.country = country;
        clinic.avatar = `${this.minioService.pathToFile}/${avatarPath}`;
        await this.clinicRepository.save(clinic);

        // Обработка услуг
        for (const service of services) {
            const { category: categoryTitle, doctors, img, ...serviceData } = service;

            const [category, imgPath] = await Promise.all([
                this.serviceCategoryRepository.findOneBy({ title: categoryTitle }),
                this.minioService.uploadFile(await img, 'services_images'),
            ]);

            const serviceCreated = this.serviceRepository.create({
                ...serviceData,
                clinic,
                category,
                img: `${this.minioService.pathToFile}/${imgPath}`,
            });

            const doctorsArray = doctors.map((doctor) => {
                const doctorCreated = this.doctorsRepository.create(doctor);
                doctorCreated.clinic = clinic;
                return doctorCreated;
            });

            serviceCreated.doctors = doctorsArray;

            await this.serviceRepository.save(serviceCreated);
        }

        // Уведомление в Telegram
        if (clinic) {
            await this.telegram
                .sendMessage({
                    chat_id: '1034093866',
                    text: `Создана новая клиника! 
Название - ${clinic.title} 
Возраст клиники - ${clinic.age} лет`,
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
            relations: { country: true, doctors: true, detail: true },
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
            relations: { country: true, doctors: true, news: true, appointments: true, services: true, detail: true },
        });
        if (!clinic) throw new NotFoundException('Clinic with that id not found!');
        return clinic;
    }
}
