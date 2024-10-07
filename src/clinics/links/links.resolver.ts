import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { LinksService } from './links.service';
import { Link } from './entities/link.entity';

@Resolver(() => Link)
export class LinksResolver {
    constructor(private readonly linksService: LinksService) {}

    @Mutation(() => Link, { name: 'generateLink' })
    async generateLink(@Args('clinicEmail', { nullable: true }) clinicEmail?: string) {
        return await this.linksService.generateLink(clinicEmail);
    }
    @Query(() => Link, { name: 'validateLink' })
    async validateLink(@Args('_id') _id: string) {
        return await this.linksService.validateLink(_id);
    }
}
