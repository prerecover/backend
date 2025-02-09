import { forwardRef, Module } from '@nestjs/common';
import { ServicesService } from './services.service';
import { ServicesResolver } from './services.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Service } from './entities/service.entity';
import { NewsModule } from 'src/news/news.module';
import { ClinicsModule } from 'src/clinics/clinics.module';
import { ServiceCategory } from './entities/serviceCategory.entity';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { AppointmentsModule } from 'src/appointments/appointments.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Doctor, Service, ServiceCategory]),
        forwardRef(() => ClinicsModule),
        forwardRef(() => DoctorsModule),
        forwardRef(() => AppointmentsModule),
        NewsModule,
    ],
    providers: [ServicesResolver, ServicesService],
    exports: [ServicesService],
})
export class ServicesModule {}
