import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateClinicInput {
    @Field()
    public title: string;

    @Field()
    public address: string;
}
