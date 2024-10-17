import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AdminStats {
    @Field()
    public approovedAppointments: number;

    @Field()
    public pendingAppointments: number;

    @Field()
    public inProcessAppointments: number;
}
