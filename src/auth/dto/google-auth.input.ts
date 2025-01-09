import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class GoogleAuthInput {
    @Field()
    public id: number;

    @Field()
    public name: string;

    @Field()
    public email: string;

    @Field()
    public image: string;
}
