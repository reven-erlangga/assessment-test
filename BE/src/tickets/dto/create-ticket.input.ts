import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsString } from 'class-validator';
import { TicketPriority, TicketStatus } from '../entities/ticket.entity';

@InputType()
export class CreateTicketInput {
  @Field({ description: 'Title of the ticket' })
  @IsString()
  title: string;

  @Field({ description: 'Description of the ticket' })
  @IsString()
  description: string;

  @Field(() => TicketPriority, { description: 'Priority of the ticket' })
  @IsEnum(TicketPriority)
  priority: TicketPriority;

  @Field(() => TicketStatus, { description: 'Status of the ticket' })
  @IsEnum(TicketStatus)
  status: TicketStatus;
}