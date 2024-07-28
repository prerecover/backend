import { InputType, Field, Int, Float } from '@nestjs/graphql';
import { Doctor } from 'src/doctors/entities/doctor.entity';

@InputType()
export class CreateServiceInput {
    @Field()
    public title: string;

    @Field()
    public description: string;

    @Field(() => Int)
    public duration: number;

    @Field(() => Float)
    public price: number;

    @Field(() => [String])
    public doctorIds: string[];
}
