import { InputType, Field } from '@nestjs/graphql';
@InputType()
export class OtherAuthInput {
    @Field()
    public id: string;

    @Field()
    public name: string;

    @Field({ nullable: true })
    public email?: string;

    @Field({ nullable: true })
    public image?: string;
}
