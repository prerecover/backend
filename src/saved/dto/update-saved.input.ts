import { CreateSavedInput } from './create-saved.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSavedInput extends PartialType(CreateSavedInput) {
    @Field(() => Int)
    id: number;
}
