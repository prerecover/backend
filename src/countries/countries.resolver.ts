import { Resolver, Query, Args } from '@nestjs/graphql';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';
import { PaginateArgs } from 'src/common/args/paginateArgs';

@Resolver(() => Country)
export class CountriesResolver {
    constructor(private readonly countriesService: CountriesService) {}

    @Query(() => [Country], { name: 'countries' })
    async findAll(@Args({ nullable: true }) args?: PaginateArgs) {
        return await this.countriesService.findAll(args);
    }

    @Query(() => Country, { name: 'country' })
    async findOne(@Args('slug') slug: string) {
        return await this.countriesService.findOne(slug);
    }
}
