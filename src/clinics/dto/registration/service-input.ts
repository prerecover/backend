import { InputType, Field, Int, Float } from '@nestjs/graphql';
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
