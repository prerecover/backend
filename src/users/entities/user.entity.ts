import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '../../common/common.entity';
import { Column, DeleteDateColumn, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Country } from 'src/countries/entities/country.entity';
import { IsPhoneNumber, Validate } from 'class-validator';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { IsUnique } from 'src/common/shared/unique.validator';
import { Like } from 'src/likes/entities/like.entity';
import { Saved } from 'src/saved/entities/saved.entity';

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
    public isStaff: boolean;

    @Field()
    @Column({ default: false })
    public online: boolean;

    @Field({ nullable: true })
    @Column({ name: 'address', length: 225, nullable: true })
    public address: string;

    @Field({ nullable: true })
    @Column({ name: 'city', length: 225, nullable: true })
    public city: string;

    @Field({ nullable: true })
    @Column({ name: 'first_name', length: 30, nullable: true })
    public firstName: string;

    @Field({ nullable: true })
    @Column({ name: 'last_name', length: 30, nullable: true })
    public lastName: string;

    @Field({ nullable: true })
    @Column({ name: 'surname', length: 30, nullable: true })
    public surname: string;

    // @Field(() => [Appointment], { nullable: true })
    @OneToMany(() => Appointment, (appmt) => appmt.user, { onDelete: 'SET NULL' })
    public appointments: Appointment[];

    @Field(() => Country, { nullable: true })
    @ManyToOne(() => Country, (country) => country.users, { onDelete: 'SET NULL' })
    public country: Country;

    @Field({ nullable: true })
    @Column({ name: 'verification_code', nullable: true })
    public verificationCode: number;

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

    @Field({ nullable: true })
    @Column({ nullable: true })
    public sex: boolean;

    @Field({ description: 'Deleted at timestamp' })
    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone' })
    public deleted_at: Date;

    @OneToMany(() => Saved, (saved) => saved.author)
    public saved: Saved[];

    @OneToMany(() => Like, (like) => like.author)
    public likes: Like[];
}
