import { Query, Resolver } from '@nestjs/graphql';
import { CommonService } from './common.service';
import { Search } from './obj-types/search';
import { History } from './obj-types/history';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { CurrentUser } from './shared/user.decorator';
import { User } from 'src/users/entities/user.entity';

@Resolver()
export class CommonResolver {
    constructor(private readonly commonService: CommonService) {}

    @Query(() => Search, { name: 'search' })
    async search() {
        console.log(await this.commonService.search());
        return await this.commonService.search();
    }
    @UseGuards(AuthGuard)
    @Query(() => History, { name: 'history' })
    async history(@CurrentUser() user: User) {
        return await this.commonService.history(user._id);
    }
}
