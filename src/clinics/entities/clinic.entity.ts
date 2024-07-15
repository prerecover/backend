import { ObjectType, Field, Int, HideField, Float } from '@nestjs/graphql';
import { CommonEntity } from 'src/common/common.entity';
import { News } from 'src/news/entities/news.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { IsPhoneNumber } from 'class-validator';
import { Country } from 'src/countries/entities/country.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Appointment } from 'src/appointments/entities/appointment.entity';

const BCRYPT_HASH_ROUNDS = 12;

@ObjectType()
@Entity({ name: 'clinics' })
export class Clinic extends CommonEntity {
    @Field()
    @Column({ unique: true, length: 225 })
    public title: string;

    @Field()
    @Column({ name: 'is_verified', default: false })
    public isVerfied: boolean;

    @Field(() => Float)
    @Column({ type: 'float', default: 5.0 })
    public rating: number;

    @Field()
    @Column()
    public specialization: string;

    @Field(() => Int)
    @Column({ name: 'start_time' })
    public startTime: number;

    @Field(() => Int)
    @Column({ name: 'end_time' })
    public endTime: number;

    @Field()
    @Column({ name: 'workdays' })
    public workDays: string;

    @OneToMany(() => Doctor, (doctor) => doctor.clinic)
    public doctors: Doctor[];

    @Field(() => Country, { nullable: true })
    @ManyToOne(() => Country, (country) => country.clinics, { onDelete: 'SET NULL' })
    public country: Country;

    @Field(() => [Appointment])
    @OneToMany(() => Appointment, (appmt) => appmt.clinic, { onDelete: 'SET NULL' })
    public appointments: Appointment[];

    @Field(() => Int, { nullable: true })
    @Column({ nullable: true, default: 0 })
    public emplouyees: number;
    @Field()
    @Column({ length: 225 })
    public description: string;

    @Field()
    @Column({ name: 'admin_firstname', length: 30 })
    public adminFirstName: string;

    @Field()
    @Column({ name: 'admin_lastname', length: 30 })
    public adminLastName: string;

    @Field()
    @IsPhoneNumber('UZ')
    @Column({ name: 'admin_number' })
    public adminNumber: string;

    @Field()
    @Column({ name: 'address', length: 225 })
    public address: string;

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

    @Field(() => [News])
    @OneToMany(() => News, (news) => news.clinic)
    public news: News[];

    @BeforeInsert()
    @BeforeUpdate()
    async beforeInsertOrUpdate() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, BCRYPT_HASH_ROUNDS);
        }
    }
}
