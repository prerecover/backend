import { InputType, Field } from '@nestjs/graphql';

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
