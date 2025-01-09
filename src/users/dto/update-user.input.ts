import { CreateUserInput } from './create-user.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { DetailUserInput } from './detail-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserInput) {
    @Field({ nullable: true })
    public readonly countryTitle: string;

    @Field({ nullable: true })
    address: string;

    @Field({ nullable: true })
    city: string;

    @Field()
    detail: DetailUserInput;
}
