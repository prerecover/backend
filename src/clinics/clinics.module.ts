import { forwardRef, Module } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { ClinicsResolver } from './clinics.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from './entities/clinic.entity';
import { News } from 'src/news/entities/news.entity';
import { Country } from 'src/countries/entities/country.entity';
import { ServicesModule } from 'src/services/services.module';
import { NewsModule } from 'src/news/news.module';
import { LinksModule } from './links/links.module';
import { Service } from 'src/services/entities/service.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { MinioService } from 'src/config/s3/minio.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Clinic, News, Country, Service, Doctor]),
        forwardRef(() => ServicesModule),
        NewsModule,
        LinksModule,
    ],
    providers: [ClinicsResolver, ClinicsService, MinioService],
    exports: [ClinicsService],
})
export class ClinicsModule {}
