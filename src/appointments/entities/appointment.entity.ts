import { Field, Int, ObjectType } from '@nestjs/graphql';
import { IsDate } from 'class-validator';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { CommonEntity } from 'src/common/common.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Service } from 'src/services/entities/service.entity';
import { Survey } from 'src/surveys/entities/survey.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { AvailableDate } from '../available_dates/entities/availableDate.entity';
import { Undergoing } from 'src/undergoings/entities/undergoing.entity';

@ObjectType()
@Entity({ name: 'appointments' })
export class Appointment extends CommonEntity {
    @Field(() => User, { nullable: true })
    @ManyToOne(() => User, (user) => user.appointments, { onDelete: 'CASCADE' })
    public user: User;

    @Field(() => Clinic, { nullable: true })
    @ManyToOne(() => Clinic, (clinic) => clinic.appointments, { onDelete: 'CASCADE' })
    public clinic: Clinic;

    @Field(() => Service, { nullable: true })
    @ManyToOne(() => Service, (service) => service.appointments, { onDelete: 'CASCADE' })
    public service: Service;

    @Field({ nullable: true })
    @Column({ length: 225, nullable: true })
    public title: string;

    @Field()
    @Column({ default: false })
    public online: boolean;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public file: string;

    @Field(() => Survey, { nullable: true })
    @JoinColumn()
    @OneToOne(() => Survey, (survey) => survey.appointment, { nullable: true })
    public survey: Survey;

    @OneToMany(() => Undergoing, (undergoing) => undergoing.appointment)
    @Field(() => [Undergoing], { nullable: true })
    undergoings: Undergoing[];

    @Field(() => [AvailableDate], { nullable: true })
    @OneToMany(() => AvailableDate, (avDate) => avDate.appointment)
    public availableDates: AvailableDate[];

    @IsDate()
    @Field({ nullable: true })
    @Column({ name: 'notify', type: 'timestamp with time zone', nullable: true })
    public notify: Date;

    @IsDate()
    @Field({ nullable: true })
    @Column({ name: 'time_start', type: 'timestamp with time zone', nullable: true })
    public timeStart: Date;

    @Field(() => Doctor, { nullable: true })
    @ManyToOne(() => Doctor, (doctor) => doctor.appointments, { onDelete: 'SET NULL', nullable: true })
    public doctor: Doctor;

    @Field()
    @Column({ default: 'In process' })
    public status: string;

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true })
    public duration: number;

    @Field()
    @Column({ name: 'special_check', default: false })
    public specialCheck: boolean;
}
