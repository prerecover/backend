import { Module } from '@nestjs/common';
import { CountriesService } from './countries.service';
import { CountriesResolver } from './countries.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { UsersService } from 'src/users/users.service';
import { UsersModule } from 'src/users/users.module';

@Module({
    providers: [CountriesResolver, CountriesService],

    imports: [TypeOrmModule.forFeature([Country, Clinic]), UsersModule],
})
export class CountriesModule {}
