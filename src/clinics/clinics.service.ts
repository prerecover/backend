import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateClinicInput } from './dto/create-clinic.input';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { Clinic } from './entities/clinic.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThan, Repository } from 'typeorm';
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
import { Transactional } from 'typeorm-transactional';
import { DoctorSpecialization } from 'src/doctors/entities/doctorSpecialization.entity';

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
        @InjectRepository(DoctorSpecialization)
        private readonly doctorSpecializationsRepository: Repository<DoctorSpecialization>,
        @Inject()
        private readonly minioService: MinioService,
        private readonly moduleRef: ModuleRef,
    ) {}
    private telegram: TelegramService;

    onModuleInit() {
        this.telegram = this.moduleRef.get(TelegramService, { strict: false });
    }

    async update(updateClinicInput: UpdateClinicInput, clinicId: string) {
        const { countryName, avatar, detail, services, ...data } = updateClinicInput;
        const country = await this.countryRepository.findOneBy({ title: countryName });
        this.clinicDetailRepository.update({ clinic: { _id: clinicId } }, detail);
        await this.clinicRepository.update({ _id: clinicId }, { country: country, ...data });
        return await this.clinicRepository.findOneBy({ _id: clinicId });
    }
    @Transactional()
    async registerClinic(registerClinicInput: RegisterClinicInput) {
        const { services, countryName, detail, avatar, ...data } = registerClinicInput;

        // Создание клиники и зависимостей
        const clinic = this.clinicRepository.create(data);
        const [country, clinicDetail] = await Promise.all([
            this.countryRepository.findOneBy({ title: countryName }),
            this.clinicDetailRepository.save(this.clinicDetailRepository.create(detail)),
        ]);
        if (avatar) {
            const avatarPath = await this.minioService.uploadFile(await avatar, 'clinics_images');
            clinic.avatar = `${this.minioService.pathToFile}/${avatarPath}`;
        }

        clinic.detail = clinicDetail;
        clinic.country = country;
        await this.clinicRepository.save(clinic);

        // Обработка услуг
        for (const service of services) {
            const { category: categoryTitle, doctors, avatar, ...serviceData } = service;
            const category = await this.serviceCategoryRepository.findOneBy({ title: categoryTitle });
            const serviceCreated = this.serviceRepository.create({
                ...serviceData,
                clinic,
                category,
            });
            if (avatar) {
                const imgPath = await this.minioService.uploadFile(await avatar, 'services_images');
                serviceCreated.avatar = `${this.minioService.pathToFile}/${imgPath}`;
            }

            const doctorsArray = await Promise.all(
                doctors.map(async (doctor) => {
                    const { specialization, avatar, ...data } = doctor;
                    const doctorCreated = this.doctorsRepository.create(data);

                    if (avatar) {
                        const imgPath = await this.minioService.uploadFile(await avatar, 'doctors_images');
                        doctorCreated.avatar = `${this.minioService.pathToFile}/${imgPath}`;
                    }
                    const doctorSpecialization = await this.doctorSpecializationsRepository.findOneBy({
                        title: specialization,
                    });

                    doctorCreated.clinic = clinic;
                    doctorCreated.specialization = doctorSpecialization;
                    return doctorCreated;
                }),
            );
            serviceCreated.doctors = doctorsArray;
            await this.serviceRepository.save(serviceCreated);
        }
        // if (clinic) {
        //     await this.telegram
        //         .sendMessage({
        //             chat_id: '1364527977',
        //             text: `Создана новая клиника!
        // Название - ${clinic.title}
        // Возраст клиники - ${clinic.age} лет`,
        //         })
        //         .toPromise();
        // }

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
        const { countryTitle, treated } = selectClinicInput;
        return await this.clinicRepository.find({
            where: {
                country: { title: countryTitle },
                treated: MoreThan(treated - 1),
            },
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
            relations: {
                country: true,
                doctors: { specialization: true },
                news: true,
                appointments: true,
                services: true,
                detail: true,
            },
        });
        if (!clinic) throw new NotFoundException('Clinic with that id not found!');
        return clinic;
    }
}
