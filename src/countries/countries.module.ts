import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesResolver } from './countries.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';

@Module({
    providers: [CountriesResolver, CountriesService],

    imports: [TypeOrmModule.forFeature([Country])],
})
export class CountriesModule {}
