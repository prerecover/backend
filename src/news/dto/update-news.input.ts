import { CreateNewsInput } from './create-news.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNewsInput extends PartialType(CreateNewsInput) {
  @Field(() => Int)
  id: number;
}
