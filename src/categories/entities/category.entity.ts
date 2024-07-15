import { Field, ObjectType } from '@nestjs/graphql';
import { Country } from 'src/countries/entities/country.entity';
import { Entity, ManyToOne, OneToMany } from 'typeorm';

@ObjectType()
@Entity({ name: 'categories' })
export class Category extends Country {
    constructor() {
        super();
        delete this.users;
    }

    @Field(() => Category)
    @ManyToOne(() => Category, (category) => category.children)
    parent: Category;

    @OneToMany(() => Category, (category) => category.parent)
    children: Category[];
}
