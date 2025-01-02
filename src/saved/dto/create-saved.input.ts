import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSavedInput {
    @Field()
    userId: string;

    @Field({ nullable: true })
    clinicId: string;

    @Field({ nullable: true })
    doctorId: string;

    @Field({ nullable: true })
    serviceId: string;
}
