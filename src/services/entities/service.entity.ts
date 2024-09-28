import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { CommonEntity } from 'src/common/common.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { News } from 'src/news/entities/news.entity';
import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany } from 'typeorm';

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

    @Field(() => Int)
    @Column()
    public duration: number;

    @Field()
    @Column({ default: 0 })
    public treated: number;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public img: string;

    @Field(() => Float)
    @Column({ type: 'float' })
    public price: number;

    @ManyToOne(() => Clinic, (clinic) => clinic.services, { onDelete: 'CASCADE' })
    public clinic: Clinic;

    @Field(() => [Doctor])
    @ManyToMany(() => Doctor, (doctor) => doctor.services, { cascade: true })
    @JoinTable({ name: 'service_doctors' })
    public doctors: Doctor[];

    @OneToMany(() => News, (news) => news.service)
    public news: News[];

    @OneToMany(() => Appointment, (appointment) => appointment.service)
    public appointments: Appointment[];
}
