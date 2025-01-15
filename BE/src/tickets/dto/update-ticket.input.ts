import { CreateTicketInput } from './create-ticket.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTicketInput extends PartialType(CreateTicketInput) {
  @Field(() => String)
  id: string;

  @Field(() => Date, { nullable: true })
  resolvedAt: Date;
}
