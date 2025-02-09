import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { CommonEntity } from 'src/common/common.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { News } from 'src/news/entities/news.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';
import { ServiceCategory } from './serviceCategory.entity';
import { Saved } from 'src/saved/entities/saved.entity';

export enum PAYMENT_METHOD {
    ONLINE = 'Онлайн',
    CASHBOX = 'В кассу',
    TO_DOCTOR = 'Врачу',
    INSTALLMENT = 'В рассрочку',
    CREDIT = 'В кредит',
}

@ObjectType()
@Entity({ name: 'services' })
export class Service extends CommonEntity {
    @Field()
    @Column({ length: 225 })
    public title: string;

    @Field()
    @Column({ default: false })
    public online: boolean;

    @Field()
    @Column({ default: false })
    public offline: boolean;

    @Field()
    @Column({ length: 225 })
    public description: string;

    @Field(() => Int, { nullable: true })
    @Column({ name: 'duration_min', nullable: true })
    public durationMin: number;

    @Field(() => Int, { nullable: true })
    @Column({ name: 'duration_max', nullable: true })
    public durationMax: number;

    @Field()
    @Column({ default: 0 })
    public treated: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public avatar: string;

    @Field(() => [String])
    @Column({ name: 'payment_methods', type: 'text', array: true, nullable: true })
    public paymentMethods: PAYMENT_METHOD[];

    @Field(() => Float, { nullable: true })
    @Column({ name: 'price_min', type: 'float', nullable: true })
    public priceMin: number;

    @Field(() => Float, { nullable: true })
    @Column({ name: 'price_max', type: 'float', nullable: true })
    public priceMax: number;

    @ManyToOne(() => Clinic, (clinic) => clinic.services, { onDelete: 'CASCADE' })
    public clinic: Clinic;

    @Field(() => ServiceCategory)
    @ManyToOne(() => ServiceCategory, (serviceCategory) => serviceCategory.services, { onDelete: 'SET NULL' })
    public category: ServiceCategory;

    @OneToMany(() => Saved, (saved) => saved.service, { nullable: true })
    public saved: Saved[];

    @Field(() => [Doctor])
    @ManyToMany(() => Doctor, (doctor) => doctor.services, { cascade: true })
    @JoinTable({ name: 'service_doctors' })
    public doctors: Doctor[];

    @OneToMany(() => News, (news) => news.service)
    public news: News[];

    @OneToMany(() => Appointment, (appointment) => appointment.service)
    public appointments: Appointment[];
}
