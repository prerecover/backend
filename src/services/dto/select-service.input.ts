import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class SelectServiceInput {
    @Field()
    public countryTitle: string;

    @Field()
    public startPrice: number;

    @Field()
    public endPrice: number;

    @Field()
    public online: boolean;

    @Field()
    public offline: boolean;

    @Field()
    public treated: number;
}
