import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class TelegramAuthInput {
    @Field()
    public auth_date: number;

    @Field()
    public first_name: string;

    @Field()
    public username: string;

    @Field()
    public hash: string;

    @Field()
    public id: number;

    @Field({ nullable: true })
    public photo_url: string;
}
