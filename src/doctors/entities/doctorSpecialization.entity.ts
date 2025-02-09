import { Field, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/common.entity';
import { slugify } from 'src/common/shared/slug';
import { BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Doctor } from './doctor.entity';

@ObjectType()
@Entity({ name: 'doctor_specializations' })
export class DoctorSpecialization {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    public readonly _id: string;

    @Field()
    @Column()
    public readonly title: string;

    @OneToMany(() => Doctor, (doctor) => doctor.specialization)
    public doctors: Doctor[];

    @Field()
    @Column()
    public slug: string;

    @BeforeInsert()
    generateSlug() {
        this.slug = slugify(this.title, { lower: true });
    }
}
