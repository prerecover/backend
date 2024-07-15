import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LanguagesService {
    constructor(
        @InjectRepository(Language)
        private readonly languageRepository: Repository<Language>,
    ) {
        this.languageRepository.find().then((list) => list.length === 0 && this.initLanguages());
    }
    async findAll() {
        return await this.languageRepository.find();
    }

    async findOne(slug: string) {
        return await this.languageRepository.findOneBy({ slug: slug });
    }

    // called on first init, don't use in smth other!!!
    async initLanguages() {
        return;
    }
}
