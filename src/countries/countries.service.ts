import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from './entities/country.entity';
import { Repository } from 'typeorm';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { countriesList } from 'src/config/data';

@Injectable()
export class CountriesService {
    constructor(
        @InjectRepository(Country)
        private readonly countriesRepository: Repository<Country>,
    ) {
        this.countriesRepository.find().then((list) => list.length === 0 && this.initCountries());
    }

    async findAll(args?: PaginateArgs) {
        return await this.countriesRepository.find({ take: args.take, skip: args.skip });
    }

    async findOne(slug: string) {
        return await this.countriesRepository.findOneBy({ slug: slug });
    }

    // called on first init, don't use in smth other!!!
    async initCountries() {
        countriesList.forEach((el) => {
            this.countriesRepository.save(this.countriesRepository.create({ title: el.text }));
        });
    }
}
