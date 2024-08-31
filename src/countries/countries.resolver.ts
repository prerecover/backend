import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';
import { CurrentUser } from 'src/common/shared/user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Country)
export class CountriesResolver {
    constructor(private readonly countriesService: CountriesService) { }

    @Query(() => [Country], { name: 'countries' })
    async findAll() {
        return await this.countriesService.findAll();
    }

    @Query(() => Country, { name: 'country' })
    async findOne(@Args('slug') slug: string, @CurrentUser() user: User) {
        return await this.countriesService.findOne(slug);
    }
}
