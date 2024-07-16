import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '../../common/common.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Country } from 'src/countries/entities/country.entity';
import { IsPhoneNumber, Validate } from 'class-validator';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { IsUnique } from 'src/common/shared/unique.validator';

const BCRYPT_HASH_ROUNDS = 10;

@ObjectType()
@Entity({ name: 'users' })
export class User extends CommonEntity {
    @Field({ nullable: true })
    @Validate(IsUnique, ['users', 'login'])
    @Column({ unique: true, length: 30, nullable: true })
    public login: string;

    @Field({ nullable: true })
    @IsPhoneNumber('UZ')
    @Validate(IsUnique, ['users', 'number'])
    @Column({ name: 'number', nullable: true })
    public number: string;

    @Field()
    @Column({ default: false, name: 'is_staff' })
    isStaff: boolean;

    @Field()
    @Column({ default: false })
    online: boolean;

    @Field({ nullable: true })
    @Column({ name: 'address', length: 225, nullable: true })
    public address: string;

    @Field({ nullable: true })
    @Column({ name: 'first_name', length: 30, nullable: true })
    public firstName: string;

    @Field({ nullable: true })
    @Column({ name: 'last_name', length: 30, nullable: true })
    public lastName: string;

    @Field({ nullable: true })
    @Column({ name: 'surname', length: 30, nullable: true })
    public surname: string;

    @Field(() => [Appointment], { nullable: true })
    @OneToMany(() => Appointment, (appmt) => appmt.user, { onDelete: 'SET NULL' })
    public appointments: Appointment[];

    @Field({ nullable: true })
    @ManyToOne(() => Country, (country) => country.users, { onDelete: 'SET NULL' })
    public country: Country;

    @Field()
    @Validate(IsUnique, ['users', 'email'])
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
