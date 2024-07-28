import { Resolver, Query, Args, Context } from '@nestjs/graphql';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';
import { Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { AuthInterceptor } from 'src/auth/auth.itc';
import { CurrentUser } from 'src/common/shared/user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver(() => Country)
export class CountriesResolver {
    constructor(private readonly countriesService: CountriesService) {}

    @Query(() => [Country], { name: 'countries' })
    async findAll(@CurrentUser() user: User) {
        console.log(user);
        return await this.countriesService.findAll();
    }

    @Query(() => Country, { name: 'country' })
    async findOne(@Args('slug') slug: string, @CurrentUser() user: User) {
        console.log(user);
        return await this.countriesService.findOne(slug);
    }
}
