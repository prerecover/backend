import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()
export class UsersStats {
    @Field()
    public totalCreatedUsers: number;

    @Field(() => Int)
    public completedSurvey: number;

    @Field(() => Int)
    public totalUsers: number;

    @Field(() => Float)
    public totalDeletedUsers: number;
}
