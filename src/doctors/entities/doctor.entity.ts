import { ObjectType, Field, HideField, Float } from '@nestjs/graphql';
import { IsPhoneNumber } from 'class-validator';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { CommonEntity } from 'src/common/common.entity';
import { Country } from 'src/countries/entities/country.entity';
import { BeforeInsert, BeforeUpdate, Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Service } from 'src/services/entities/service.entity';

const BCRYPT_HASH_ROUNDS = 12;
@ObjectType()
@Entity({ name: 'doctors' })
export class Doctor extends CommonEntity {
    @Field({ nullable: true })
    @Column({ name: 'first_name', length: 30, nullable: true })
    public firstName: string;

    @Field({ nullable: true })
    @Column({ name: 'last_name', length: 30, nullable: true })
    public lastName: string;

    @Field({ nullable: true })
    @Column({ name: 'surname', length: 30, nullable: true })
    public surname: string;

    @Field()
    @Column({ default: false })
    online: boolean;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public specialization: string;

    @Field(() => Float, { nullable: true })
    @Column({ name: 'work_experience', nullable: true })
    public workExp: number;

    @Field(() => Clinic, { nullable: true })
    @ManyToOne(() => Clinic, (clinic) => clinic.doctors, { onDelete: 'CASCADE', nullable: true })
    public clinic: Clinic;

    @Field()
    @Column({ default: false, name: 'main_status' })
    mainStatus: boolean;

    @Field({ nullable: true })
    @IsPhoneNumber('UZ')
    @Column({ nullable: true })
    public number: string;

    @Field({ nullable: true })
    @Column({ length: 225, unique: true, nullable: true })
    public email: string;

    @Field({ nullable: true })
    @Column({ nullable: true })
    public avatar: string;

    @HideField()
    @Column({ nullable: true })
    public password: string;

    @Field(() => Country, { nullable: true })
    @ManyToOne(() => Country, (country) => country.doctors, { onDelete: 'SET NULL', nullable: true })
    public country: Country;

    // @Field(() => [Service])
    @ManyToMany(() => Service, (service) => service.doctors)
    public services: Service[];

    @BeforeInsert()
    @BeforeUpdate()
    async beforeInsertOrUpdate() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, BCRYPT_HASH_ROUNDS);
        }
    }
}
