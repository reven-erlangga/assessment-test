import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { TicketsService } from './tickets.service';
import { Ticket, TicketActivity, TicketStatus } from './entities/ticket.entity';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';

@Resolver(() => Ticket)
export class TicketsResolver {
  constructor(private readonly ticketsService: TicketsService) { }

  @Mutation(() => Ticket)
  createTicket(@Args('createTicketInput') createTicketInput: CreateTicketInput) {
    return this.ticketsService.create(createTicketInput);
  }

  @Query(() => [Ticket], { name: 'tickets' })
  async findAll() {
    return this.ticketsService.findAll();
  }

  @Query(() => Ticket, { name: 'ticket' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.ticketsService.findOne(id);
  }

  @Mutation(() => Ticket)
  updateTicket(@Args('updateTicketInput') updateTicketInput: UpdateTicketInput) {

    if (updateTicketInput.status === TicketStatus.RESOLVED) {
      updateTicketInput.resolvedAt = new Date();
    }

    return this.ticketsService.update(updateTicketInput.id, updateTicketInput);
  }

  @Mutation(() => Ticket)
  removeTicket(@Args('id', { type: () => String }) id: string) {
    return this.ticketsService.remove(id);
  }

  @Query(() => TicketActivity, { name: 'ticketActivity' })
  async ticketActivity() {
    return this.ticketsService.ticketActivity();
  }
}
