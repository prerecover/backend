import { Module } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { ClinicsResolver } from './clinics.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from './entities/clinic.entity';
import { News } from 'src/news/entities/news.entity';
import { Country } from 'src/countries/entities/country.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Clinic, News, Country])],
    providers: [ClinicsResolver, ClinicsService],
    exports: [ClinicsService],
})
export class ClinicsModule {}
