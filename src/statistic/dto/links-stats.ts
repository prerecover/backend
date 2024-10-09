import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class LinksStats {
    @Field()
    public totalGenerated: number;

    @Field()
    public totalUsed: number;
}
