import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class RegisterDoctorInput {
    @Field()
    public firstName: string;

    @Field()
    public lastName: string;

    @Field()
    public specialization: string;

    @Field(() => Float)
    public workExp: number;
}
