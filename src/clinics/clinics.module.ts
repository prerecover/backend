import { forwardRef, Module } from '@nestjs/common';
import { ClinicsService } from './clinics.service';
import { ClinicsResolver } from './clinics.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Clinic } from './entities/clinic.entity';
import { News } from 'src/news/entities/news.entity';
import { Country } from 'src/countries/entities/country.entity';
import { ServicesModule } from 'src/services/services.module';
import { ServicesService } from 'src/services/services.service';
import { NewsModule } from 'src/news/news.module';
import { LinksModule } from './links/links.module';

@Module({
    imports: [TypeOrmModule.forFeature([Clinic, News, Country]), forwardRef(() => ServicesModule), NewsModule, LinksModule],
    providers: [ClinicsResolver, ClinicsService],
    exports: [ClinicsService],
})
export class ClinicsModule { }
