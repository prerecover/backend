import { ObjectType, Field, HideField, Float } from '@nestjs/graphql';
import { IsPhoneNumber } from 'class-validator';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { CommonEntity } from 'src/common/common.entity';
import { Country } from 'src/countries/entities/country.entity';
import { Column, Entity, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { Service } from 'src/services/entities/service.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Saved } from 'src/saved/entities/saved.entity';
import { DoctorSpecialization } from './doctorSpecialization.entity';

@ObjectType()
@Entity({ name: 'doctors' })
export class Doctor extends CommonEntity {
    @Field({ nullable: true })
    @Column({ name: 'first_name', length: 30, nullable: true })
    public firstName: string;

    @Field({ nullable: true })
    @Column({ name: 'last_name', length: 30, nullable: true })
    public lastName: string;

    @Field({ nullable: true })
    @Column({ name: 'surname', length: 30, nullable: true })
    public surname: string;

    @Field()
    @Column({ default: false })
    public online: boolean;

    @Field(() => DoctorSpecialization)
    @ManyToOne(() => DoctorSpecialization, (spec) => spec.doctors, { onDelete: 'SET NULL' })
    public specialization: DoctorSpecialization;

    @Field(() => Float, { nullable: true })
    @Column({ name: 'work_experience', nullable: true })
    public workExp: number;

    @Field(() => Clinic, { nullable: true })
    @ManyToOne(() => Clinic, (clinic) => clinic.doctors, { onDelete: 'CASCADE', nullable: true })
    public clinic: Clinic;

    @OneToMany(() => Saved, (saved) => saved.doctor, { nullable: true })
    public saved: Saved[];

    @Field({ nullable: true })
    @Column({ default: false, name: 'main_status', nullable: true })
    mainStatus: boolean;

    @Field({ nullable: true })
    @IsPhoneNumber('UZ')
    @Column({ nullable: true })
    public number: string;

    @Field({ nullable: true })
    @Column({ length: 225, unique: true, nullable: true })
    public email: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public avatar: string;

    @HideField()
    @Column({ nullable: true })
    public password: string;

    @Field(() => Country, { nullable: true })
    @ManyToOne(() => Country, (country) => country.doctors, { onDelete: 'SET NULL', nullable: true })
    public country: Country;

    @Field(() => [Appointment], { nullable: true })
    @OneToMany(() => Appointment, (appointment) => appointment.doctor)
    public appointments: Appointment[];

    // @Field(() => [Service])
    @ManyToMany(() => Service, (service) => service.doctors)
    public services: Service[];
}
