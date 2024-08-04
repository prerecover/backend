import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateAppointmentInput {
    // @Field()
    // public title: string;

    @Field()
    public clinicId: string;

    @Field()
    public serviceId: string;

    @Field({ defaultValue: true })
    public online: boolean;

    @Field()
    public doctorId: string;

    @Field()
    public timeStart: Date;
}
