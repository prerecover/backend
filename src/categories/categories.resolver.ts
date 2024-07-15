import { Resolver, Query, Args } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './entities/category.entity';

@Resolver(() => Category)
export class CategoriesResolver {
    constructor(private readonly categoriesService: CategoriesService) { }

    @Query(() => [Category], { name: 'categories' })
    findAll() {
        return this.categoriesService.findAll();
    }

    @Query(() => Category, { name: 'category' })
    findOne(@Args('slug') slug: string) {
        return this.categoriesService.findOne(slug);
    }
}
