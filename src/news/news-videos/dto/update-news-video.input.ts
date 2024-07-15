import { CreateNewsVideoInput } from './create-news-video.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateNewsVideoInput extends PartialType(CreateNewsVideoInput) {
  @Field(() => Int)
  id: number;
}
