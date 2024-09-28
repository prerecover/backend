import { Resolver, Query, Args } from '@nestjs/graphql';
import { CountriesService } from './countries.service';
import { Country } from './entities/country.entity';
import { PaginateArgs } from 'src/common/args/paginateArgs';
import { PusherService } from 'nestjs-pusher';

@Resolver(() => Country)
export class CountriesResolver {
    constructor(
        private readonly countriesService: CountriesService,
        private readonly pusherService: PusherService,
    ) {}

    @Query(() => [Country], { name: 'countries' })
    async findAll(@Args({ nullable: true }) args?: PaginateArgs) {
        this.pusherService.trigger('my-channel', 'my-event', { asd: 123 }).catch((res) => console.log(res));
        console.log('tot');
        return await this.countriesService.findAll(args);
    }

    @Query(() => Country, { name: 'country' })
    async findOne(@Args('slug') slug: string) {
        return await this.countriesService.findOne(slug);
    }
}
