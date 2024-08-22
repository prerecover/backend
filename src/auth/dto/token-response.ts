import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class TokenResponse {
    @Field()
    public access_token: string;
}
