import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SelectServiceInput {
    @Field()
    public countryTitle: string;

    @Field()
    public startPrice: number;

    @Field()
    public endPrice: number;
}
