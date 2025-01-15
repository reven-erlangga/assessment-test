import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { IsEnum } from "class-validator";

export enum TicketStatus {
  OPEN = 'OPEN',
  RESOLVED = 'RESOLVED',
}

export enum TicketPriority {
  NON_URGENT = 'NON_URGENT',
  LESS_URGENT = 'LESS_URGENT',
  URGENT = 'URGENT',
  EMERGENCY = 'EMERGENCY',
}

registerEnumType(TicketStatus, {
  name: 'TicketStatus',
});

registerEnumType(TicketPriority, {
  name: 'TicketPriority',
});

@ObjectType()
export class Ticket {
  @Field(() => ID, { description: 'Identity of ticket' })
  id: string;

  @Field({ description: 'Title of ticket' })
  title: string;

  @Field({ description: 'Content of ticket' })
  description: string;

  @Field(() => TicketPriority, { description: 'Priority of ticket' })
  @IsEnum(TicketPriority)
  priority: TicketPriority;

  @Field(() => TicketStatus, { description: 'Status of ticket' })
  @IsEnum(TicketStatus)
  status: TicketStatus;
}

@ObjectType()
export class TicketActivity {
  @Field({ description: 'Total number of tickets' })
  totalTickets: number;

  @Field({ description: 'Total number of urgent tickets' })
  totalUrgentTickets: number;

  @Field({ description: 'Total number of open tickets' })
  totalOpenTickets: number;

  @Field({ description: 'Total number of resolved tickets' })
  totalResolvedTickets: number;

  @Field({ description: 'Average number of resolved tickets per day' })
  averageResolvedPerDay: number;
}