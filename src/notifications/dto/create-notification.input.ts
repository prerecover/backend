import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateNotificationInput {
  @Field()
  text: string;

  @Field()
  userId: string;
}
