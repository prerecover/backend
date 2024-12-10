import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { RegisterDoctorInput } from './doctor-input';
import { ServiceCategory } from 'src/services/entities/serviceCategory.entity';
@InputType()
export class RegisterServiceInput {
    @Field()
    public title: string;

    @Field()
    public online: boolean;

    @Field()
    public offline: boolean;

    @Field()
    public category: string;

    @Field()
    public description: string;

    @Field(() => Int)
    public duration: number;

    @Field(() => Float)
    public price: number;

    @Field(() => [RegisterDoctorInput])
    public doctors: RegisterDoctorInput[];
}
