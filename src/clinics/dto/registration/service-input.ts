
import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { RegisterDoctorInput } from './doctor-input';
@InputType()
export class RegisterServiceInput {
    @Field()
    public title: string;


    @Field()
    public online: boolean;

    @Field()
    public offline: boolean;

    @Field()
    public description: string;

    @Field(() => Int)
    public duration: number;

    @Field(() => Float)
    public price: number;

    @Field(() => [RegisterDoctorInput])
    public doctors: RegisterDoctorInput[];



}
