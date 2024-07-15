import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '../../common/common.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Country } from 'src/countries/entities/country.entity';
import { IsPhoneNumber } from 'class-validator';
import { Appointment } from 'src/appointments/entities/appointment.entity';

const BCRYPT_HASH_ROUNDS = 10;

@ObjectType()
@Entity({ name: 'users' })
export class User extends CommonEntity {
    @Field()
    @Column({ unique: true, length: 30 })
    public login: string;

    @Field()
    @IsPhoneNumber('UZ')
    @Column({ name: 'number' })
    public number: string;

    @Field()
    @Column({ default: false, name: 'is_staff' })
    isStaff: boolean;

    @Field()
    @Column({ default: false })
    online: boolean;

    @Field()
    @Column({ name: 'address', length: 225 })
    public address: string;

    @Field()
    @Column({ name: 'first_name', length: 30 })
    public firstName: string;

    @Field()
    @Column({ name: 'last_name', length: 30 })
    public lastName: string;

    @Field()
    @Column({ name: 'surname', length: 30 })
    public surname: string;

    @Field(() => [Appointment])
    @OneToMany(() => Appointment, (appmt) => appmt.user, { onDelete: 'SET NULL' })
    public appointments: Appointment[];

    @Field({ nullable: true })
    @ManyToOne(() => Country, (country) => country.users, { onDelete: 'SET NULL' })
    public country: Country;

    @Field()
    @Column({ length: 225, unique: true })
    public email: string;


    @HideField()
    @Column({})
    public password: string;

    @Field({ nullable: true })
    @Column({ type: 'date', nullable: true })
    public birthday: Date;

    @Column({ name: 'is_verified', default: false })
    @Field()
    public isVerfied: boolean;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public avatar: string;

    @Field()
    @Column({ nullable: true })
    public sex: boolean;

    @BeforeInsert()
    @BeforeUpdate()
    async beforeInsertOrUpdate() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, BCRYPT_HASH_ROUNDS);
        }
    }
}
