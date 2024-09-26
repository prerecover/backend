import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class AvailableDateInput {
    @Field()
    public appointmentId: string;

    @Field(() => [Date])
    public availableDates: Date[];
}
