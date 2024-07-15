import { Resolver, Query, Args } from '@nestjs/graphql';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';

@Resolver(() => Country)
export class CountriesResolver {
    constructor(private readonly countriesService: CountriesService) {}

    @Query(() => [Country], { name: 'countries' })
    findAll() {
        return this.countriesService.findAll();
    }

    @Query(() => Country, { name: 'country' })
    findOne(@Args('slug') slug: string) {
        return this.countriesService.findOne(slug);
    }
}
