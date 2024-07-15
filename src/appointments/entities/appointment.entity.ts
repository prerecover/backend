import { ObjectType, Field, Int } from '@nestjs/graphql';
import { IsDate } from 'class-validator';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { CommonEntity } from 'src/common/common.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne } from 'typeorm';

@ObjectType()
@Entity({ name: 'appointments' })
export class Appointment extends CommonEntity {
    @Field(() => User, { nullable: true })
    @ManyToOne(() => User, (user) => user.appointments, { onDelete: 'CASCADE' })
    public user: User;

    @Field(() => Clinic, { nullable: true })
    @ManyToOne(() => Clinic, (clinic) => clinic.appointments, { onDelete: 'CASCADE' })
    public clinic: Clinic;

    @Field()
    @Column({ length: 225 })
    public title: string;

    @Field()
    @Column({ default: false })
    public online: boolean;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public file: string;

    @IsDate()
    @Field()
    @Column({ name: 'notify', type: 'timestamp with time zone', nullable: true })
    public notify: Date;

    @IsDate()
    @Field()
    @Column({ name: 'time_start', type: 'timestamp with time zone' })
    public timeStart: Date;

    @Field(() => [Doctor])
    @ManyToMany(() => Doctor, { onDelete: 'SET NULL' })
    @JoinTable({ name: 'appointments_doctors' })
    public doctors: Doctor[];

    @IsDate()
    @Field()
    @Column({ name: 'time_end', type: 'timestamp with time zone' })
    public timeEnd: Date;

    @Field()
    @Column({ default: 'In process' })
    public status: string;

    @Field()
    @Column({ name: 'special_check', default: false })
    public specialCheck: boolean;
}
