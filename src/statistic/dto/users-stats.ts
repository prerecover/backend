import { InputType, Field, Int, Float } from '@nestjs/graphql';

@InputType()
export class UsersStats {
    @Field()
    public totalCreatedUsers: number;

    @Field()
    public smsRegistration: number;

    @Field()
    public smsForgot: number;

    @Field(() => Int)
    public completedSurvey: number;

    @Field(() => Int)
    public createdSurvey: number;

    @Field(() => Float)
    public totalDeletedUsers: number;
}
