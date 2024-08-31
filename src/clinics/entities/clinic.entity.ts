import { ObjectType, Field, Int, HideField, Float } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/common.entity';
import { News } from 'src/news/entities/news.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
import { IsPhoneNumber, IsStrongPassword } from 'class-validator';
import { Country } from 'src/countries/entities/country.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Service } from 'src/services/entities/service.entity';

@ObjectType()
@Entity({ name: 'clinics' })
export class Clinic extends CommonEntity {
    @Field()
    @Column({ unique: true, length: 225 })
    public title: string;

    @Field()
    @Column({ name: 'is_verified', default: false })
    public isVerfied: boolean;

    @Field()
    @Column({ default: 0 })
    public treated: number;

    @Field(() => Float)
    @Column({ type: 'float', default: 5.0 })
    public rating: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public specialization: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public site: string;

    @Field(() => Int, { nullable: true })
    @Column({ name: 'start_time', nullable: true })
    public startTime: number;

    @Field(() => Int, { nullable: true })
    @Column({ name: 'end_time', nullable: true })
    public endTime: number;

    @Field({ nullable: true })
    @Column({ name: 'workdays', nullable: true })
    public workDays: string;

    @Field(() => [Doctor])
    @OneToMany(() => Doctor, (doctor) => doctor.clinic)
    public doctors: Doctor[];

    @Field(() => Country, { nullable: true })
    @ManyToOne(() => Country, (country) => country.clinics, { onDelete: 'SET NULL' })
    public country: Country;

    @Field({ nullable: true })
    @Column({ length: 225, nullable: true })
    public city: string;

    @Field(() => [Appointment], { nullable: true })
    @OneToMany(() => Appointment, (appmt) => appmt.clinic, { onDelete: 'SET NULL', nullable: true })
    public appointments: Appointment[];

    @Field(() => Int)
    @Column({ nullable: true, default: 0 })
    public employees: number;

    @Field({ nullable: true })
    @Column({ length: 225, nullable: true })
    public description: string;

    @Field({ nullable: true })
    @Column({ name: 'admin_firstname', length: 30, nullable: true })
    public adminFirstName: string;

    @Field({ nullable: true })
    @Column({ name: 'admin_lastname', length: 30, nullable: true })
    public adminLastName: string;

    @Field({ nullable: true })
    @IsPhoneNumber('UZ')
    @Column({ name: 'admin_number', nullable: true })
    public adminNumber: string;

    @Field({ nullable: true })
    @Column({ name: 'address', length: 225, nullable: true })
    public address: string;

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

    @Field({ description: 'Deleted at timestamp' })
    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone' })
    public deleted_at: Date;

    @OneToMany(() => Service, (service) => service.clinic, { nullable: true })
    public services: Service[];

    @OneToMany(() => News, (news) => news.clinic, { nullable: true })
    public news: News[];
}
