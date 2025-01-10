import { Field, HideField, ObjectType } from '@nestjs/graphql';
import { CommonEntity } from '../../common/common.entity';
import { BeforeInsert, Column, DeleteDateColumn, Entity, ManyToOne, OneToMany, OneToOne } from 'typeorm';
import { Country } from 'src/countries/entities/country.entity';
import { IsPhoneNumber, Validate } from 'class-validator';
import { Appointment } from 'src/appointments/entities/appointment.entity';
import { IsUnique } from 'src/common/shared/unique.validator';
import { Like } from 'src/likes/entities/like.entity';
import { Saved } from 'src/saved/entities/saved.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { getRandomInt } from 'src/common/shared/utils';
import { UserDetail } from './userDetail.entity';

@ObjectType()
@Entity({ name: 'users' })
export class User extends CommonEntity {
    @Field({ nullable: true })
    @Column({
        name: 'user_id',
        unique: true,
        nullable: true,
    })
    public userId: string;

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

    @Field({ nullable: true })
    @Column({ name: 'telegram_id', nullable: true })
    public telegramId: string;

    @Field({ nullable: true })
    @Column({ name: 'vk_id', nullable: true })
    public vkId: string;

    @Field({ nullable: true })
    @Column({ name: 'google_id', nullable: true })
    public googleId: string;

    @Field({ nullable: true })
    @Validate(IsUnique, ['users', 'email'])
    @Column({ length: 225, unique: true, nullable: true })
    public email: string;

    @Field(() => [Notification], { nullable: true })
    @OneToMany(() => Notification, (notification) => notification.user, { onDelete: 'SET NULL' })
    public notifications: Notification[];

    @HideField()
    @Column()
    public password: string;

    @Field({ nullable: true })
    @Column({ type: 'date', nullable: true })
    public birthday: Date;

    @Column({ name: 'is_verified', default: false })
    @Field()
    public isVerfied: boolean;

    @Column({ name: 'history_studied', default: false })
    @Field()
    public historyStudied: boolean;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public avatar: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public sex: boolean;

    @Field({ description: 'Deleted at timestamp', nullable: true })
    @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp with time zone' })
    public deletedAt: Date;

    @Field(() => Saved, { nullable: true })
    @OneToMany(() => Saved, (saved) => saved.user, { nullable: true })
    public saved: Saved[];

    @OneToMany(() => Like, (like) => like.author)
    public likes: Like[];

    @Field(() => UserDetail, { nullable: true })
    @OneToOne(() => UserDetail, (userDetail) => userDetail.user, { onDelete: 'SET NULL', nullable: true })
    public detail: UserDetail;

    @BeforeInsert()
    assignUserId() {
        this.userId = getRandomInt(10 ** 12, 10 ** 12 + 9 * 11111111111).toString();
    }
}
