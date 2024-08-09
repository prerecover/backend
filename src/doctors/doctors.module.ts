import { Module } from '@nestjs/common';
import { DoctorsService } from './doctors.service';
import { DoctorsResolver } from './doctors.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { Country } from 'src/countries/entities/country.entity';
import { ServicesModule } from 'src/services/services.module';
import { ClinicsModule } from 'src/clinics/clinics.module';

@Module({
    imports: [TypeOrmModule.forFeature([Doctor, Country]), ServicesModule, ClinicsModule],
    providers: [DoctorsResolver, DoctorsService],
})
export class DoctorsModule {}
