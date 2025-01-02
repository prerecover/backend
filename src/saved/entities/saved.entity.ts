import { ObjectType, Field } from '@nestjs/graphql';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Service } from 'src/services/entities/service.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity({ name: 'saved' })
export class Saved {
    @Field({ nullable: true })
    @PrimaryGeneratedColumn('uuid')
    public readonly _id: string;

    @Field(() => Clinic, { nullable: true })
    @ManyToOne(() => Clinic, (clinic) => clinic.saved, { onDelete: 'CASCADE', nullable: true })
    public clinic: Clinic;

    @Field(() => Doctor, { nullable: true })
    @ManyToOne(() => Doctor, (doctor) => doctor.saved, { onDelete: 'CASCADE', nullable: true })
    public doctor: Doctor;

    @Field(() => Service, { nullable: true })
    @ManyToOne(() => Service, (service) => service.saved, { onDelete: 'CASCADE', nullable: true })
    public service: Service;

    @Field(() => User, { nullable: true })
    @ManyToOne(() => User, (user) => user.saved, { onDelete: 'CASCADE', nullable: false })
    public user: User;
}
