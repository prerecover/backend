import { ObjectType, Field } from '@nestjs/graphql';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { slugify } from 'src/common/shared/slug';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { User } from 'src/users/entities/user.entity';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'countries' })
export class Country {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    public readonly _id: string;

    @Field()
    @Column()
    public readonly title: string;

    @OneToMany(() => User, (user) => user.country)
    public users: User[];

    @OneToMany(() => Clinic, (clinic) => clinic.country)
    public clinics: Clinic[];

    @OneToMany(() => Doctor, (doctor) => doctor.country)
    public doctors: Doctor[];

    @Field()
    @Column()
    public slug: string;

    @BeforeInsert()
    generateSlug() {
        this.slug = slugify(this.title, { lower: true });
    }
}
