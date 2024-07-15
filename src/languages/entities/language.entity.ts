import { ObjectType } from '@nestjs/graphql';
import { Book } from 'src/books/entities/book.entity';
import { Country } from 'src/countries/entities/country.entity';
import { Entity, OneToMany } from 'typeorm';

@ObjectType()
@Entity({ name: 'languages' })
export class Language extends Country {
    constructor() {
        super();
        delete this.users;
    }

    @OneToMany(() => Book, (book) => book.language)
    public books: Book[];
}
