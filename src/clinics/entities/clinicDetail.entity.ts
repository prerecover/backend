import { Field, Float, Int, ObjectType } from '@nestjs/graphql';
import { IsPhoneNumber } from 'class-validator';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Clinic } from './clinic.entity';

@ObjectType()
@Entity({ name: 'clinics' })
export class ClinicDetail {
    @Field()
    @PrimaryGeneratedColumn('uuid')
    public readonly _id: string;

    @Field()
    @Column({ name: 'computer_have', default: true })
    public computerHave: boolean;

    @Field()
    @Column({ name: 'elevator_have', default: true })
    public elevatorHave: boolean;

    @Field()
    @Column({ name: 'internet_have', default: true })
    public internetHave: boolean;

    @Field()
    @Column({ name: 'total_doctors', default: 0 })
    public totalDoctors: number;

    @Field()
    @Column({ name: 'total_services', default: 0 })
    public totalServices: number;

    @Field()
    @Column({ name: 'number_of_floors', default: 0 })
    public numberOfFloors: number;

    @Field(() => Float)
    @Column({ type: 'float', default: 5.0 })
    public square: number;

    @Field(() => Float)
    @Column({ type: 'float', default: 5.0 })
    public rating: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public site: string;

    @Field(() => Int, { nullable: true })
    @Column({ name: 'monday_time', nullable: true })
    public mondayTime: number;

    @Field(() => Int, { nullable: true })
    @Column({ name: 'tuesday_time', nullable: true })
    public tuesdayTime: number;

    @Field(() => Int, { nullable: true })
    @Column({ name: 'wednesday_time', nullable: true })
    public wednesdayTime: number;

    @Field(() => Int, { nullable: true })
    @Column({ name: 'thursday_time', nullable: true })
    public thursdayTime: number;

    @Field(() => Int, { nullable: true })
    @Column({ name: 'friday_time', nullable: true })
    public fridayTime: number;

    @Field(() => Int, { nullable: true })
    @Column({ name: 'saturday_time', nullable: true })
    public saturdayTime: number;

    @Field(() => Int, { nullable: true })
    @Column({ name: 'sunday_time', nullable: true })
    public sundayTime: number;

    @Field({ nullable: true })
    @Column({ name: 'admin_firstname', length: 30, nullable: true })
    public adminFirstName: string;

    @Field({ nullable: true })
    @Column({ name: 'admin_lastname', length: 30, nullable: true })
    public adminLastName: string;

    @Field({ nullable: true })
    // @IsPhoneNumber('UZ')
    @Column({ name: 'admin_number', nullable: true })
    public adminNumber: string;

    @OneToOne(() => Clinic, (clinic) => clinic.clinicDetail)
    public clinic: Clinic
}
