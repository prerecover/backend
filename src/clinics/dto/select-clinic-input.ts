import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SelectClinicInput {
    @Field()
    public countryTitle: string;

    @Field()
    public offline: boolean;

    @Field()
    public online: boolean;
}
