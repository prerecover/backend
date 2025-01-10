import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class DetailUserInput {
    @Field({ nullable: true })
    public allergy: string;

    @Field({ nullable: true })
    public height: number;

    @Field({ nullable: true })
    public weight: number;

    @Field({ nullable: true })
    public oxygen: number;

    @Field({ nullable: true })
    public pressureStart: number;

    @Field({ nullable: true })
    public pressureEnd: number;

    @Field({ nullable: true })
    public pulse: number;

    @Field({ nullable: true })
    public sleepTime: number;

    @Field({ nullable: true })
    public temperature: number;
}
