import { Query, Resolver, Args, Int } from '@nestjs/graphql';
import { StatisticService } from './statistic.service';
import { StatsOutput } from './dto/main';

@Resolver()
export class StatisticResolver {
    constructor(private readonly statisticService: StatisticService) {}

    @Query(() => StatsOutput, { name: 'stats' })
    async siteWork(@Args('chunk', { type: () => Int }) chunk: number) {
        return await this.statisticService.siteWork(chunk);
    }
}
