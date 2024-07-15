import { Module } from '@nestjs/common';
import { LanguagesService } from './languages.service';
import { LanguagesResolver } from './languages.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Language } from './entities/language.entity';

@Module({
    providers: [LanguagesResolver, LanguagesService],

    imports: [TypeOrmModule.forFeature([Language])],
})
export class LanguagesModule { }
