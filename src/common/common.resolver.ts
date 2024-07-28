import { Query, Resolver } from '@nestjs/graphql';
import { CommonService } from './common.service';
import { Search } from './obj-types/search';

@Resolver()
export class CommonResolver {
    constructor(private readonly commonService: CommonService) {}

    @Query(() => Search, { name: 'search' })
    async findAll() {
        console.log(await this.commonService.search());
        return await this.commonService.search();
    }
}
