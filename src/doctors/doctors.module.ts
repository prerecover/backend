import { forwardRef, Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsResolver } from './doctors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Country } from 'src/countries/entities/country.entity';
import { ServicesModule } from 'src/services/services.module';
import { ClinicsModule } from 'src/clinics/clinics.module';
import { Saved } from 'src/saved/entities/saved.entity';
import { AppointmentsModule } from 'src/appointments/appointments.module';
import { DoctorSpecialization } from './entities/doctorSpecialization.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Doctor, Country, Saved, DoctorSpecialization]),
        forwardRef(() => ServicesModule),
        forwardRef(() => ClinicsModule),
        forwardRef(() => AppointmentsModule),
    ],

    providers: [DoctorsResolver, DoctorsService],
    exports: [DoctorsService],
})
export class DoctorsModule {}
