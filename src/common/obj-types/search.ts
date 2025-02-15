import { Field, ObjectType } from '@nestjs/graphql';
import { Clinic } from 'src/clinics/entities/clinic.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Service } from 'src/services/entities/service.entity';
import { Undergoing } from 'src/undergoings/entities/undergoing.entity';

@ObjectType()
export class Search {
    @Field(() => [Clinic])
    public clinics: Clinic[];

    @Field(() => [Doctor])
    public doctors: Doctor[];

    @Field(() => [Service])
    public services: Service[];

    @Field(() => [Undergoing])
    public undergoings: Undergoing[];
}
