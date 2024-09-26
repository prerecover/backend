import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ClinicStats {
    @Field()
    public totalClinics: number;

    @Field()
    public totalCreated: number;

    @Field()
    public totalDeleted: number;
}
