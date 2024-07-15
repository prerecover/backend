import { Resolver, Query, Args } from '@nestjs/graphql';
import { LanguagesService } from './languages.service';
import { Language } from './entities/language.entity';

@Resolver(() => Language)
export class LanguagesResolver {
    constructor(private readonly languagesService: LanguagesService) { }

    @Query(() => [Language], { name: 'languages' })
    findAll() {
        return this.languagesService.findAll();
    }

    @Query(() => Language, { name: 'language' })
    findOne(@Args('slug') slug: string) {
        return this.languagesService.findOne(slug);
    }
}
