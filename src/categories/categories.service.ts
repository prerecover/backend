import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoriesRepository: Repository<Category>,
    ) {
        this.categoriesRepository.find().then((list) => list.length === 0 && this.initCategories());
    }
    async findAll() {
        return await this.categoriesRepository.find();
    }

    async findOne(slug: string) {
        return await this.categoriesRepository.findOneBy({ slug: slug });
    }

    // called on first init, don't use in smth other!!!
    async initCategories() {
        return;
    }
}
