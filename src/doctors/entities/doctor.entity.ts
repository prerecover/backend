import { ObjectType, Field, Int, HideField, Float } from '@nestjs/graphql';
import { IsPhoneNumber } from 'class-validator';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { CommonEntity } from 'src/common/common.entity';
import { Country } from 'src/countries/entities/country.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'doctors' })
export class Doctor extends CommonEntity {
    @Field()
    @Column({ name: 'first_name', length: 30 })
    public firstName: string;

    @Field()
    @Column({ name: 'last_name', length: 30 })
    public lastName: string;

    @Field()
    @Column({ name: 'surname', length: 30 })
    public surname: string;

    @Field()
    @Column({ default: false })
    online: boolean;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public specialization: string;

    @Field(() => Float, { nullable: true })
    @Column({ name: 'work_experience', nullable: true })
    public workExp: number;

    @Field(() => Clinic)
    @ManyToOne(() => Clinic, (clinic) => clinic.doctors, { onDelete: 'CASCADE' })
    public clinic: Clinic;

    @Field()
    @Column({ default: false, name: 'main_status' })
    mainStatus: boolean;

    @Field(() => Country, { nullable: true })
    @ManyToOne(() => Country, (country) => country.doctors, { onDelete: 'SET NULL' })
    public country: Country;

    @Field()
    @IsPhoneNumber('UZ')
    @Column()
    public number: string;

    @Field()
    @Column({ length: 225, unique: true })
    public email: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public avatar: string;

    @HideField()
    @Column()
    public password: string;
}
