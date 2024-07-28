import { InputType, Int, Field, PartialType } from '@nestjs/graphql';
import { Doctor } from '../entities/doctor.entity';
import { Clinic } from 'src/clinics/entities/clinic.entity';

@InputType()
export class CreateDoctorInput {
    @Field()
    public specialization: string;

    @Field()
    public lastName: string;

    @Field()
    public firstName: string;

    @Field()
    public surname: string;
}
