import { Injectable } from '@nestjs/common';
import { CreateTicketInput } from './dto/create-ticket.input';
import { UpdateTicketInput } from './dto/update-ticket.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TicketsService {
  constructor(
    private readonly prismaService: PrismaService
  ) { }

  async create(createTicketInput: CreateTicketInput) {
    return this.prismaService.ticket.create({
      data: createTicketInput
    });
  }

  async findAll() {
    return await this.prismaService.ticket.findMany();
  }

  async findOne(id: string) {
    return await this.prismaService.ticket.findUnique({
      where: { id }
    });
  }

  async update(id: string, updateTicketInput: UpdateTicketInput) {
    return await this.prismaService.ticket.update({
      where: { id },
      data: updateTicketInput
    });
  }

  async remove(id: string) {
    return await this.prismaService.ticket.delete({
      where: { id }
    });
  }

  async ticketActivity() {
    const totalTickets = await this.prismaService.ticket.count();
    const totalOpenTickets = await this.prismaService.ticket.count({
      where: { status: 'OPEN' }
    });
    const totalUrgentTickets = await this.prismaService.ticket.count({
      where: { priority: 'URGENT' }
    });
    const totalResolvedTickets = await this.prismaService.ticket.count({
      where: { status: 'RESOLVED' }
    });
    const resolvedTickets = await this.prismaService.ticket.findMany({
      where: { status: 'RESOLVED' },
      select: { resolvedAt: true },
    });

    if (resolvedTickets.length === 0) {
      return {
        totalTickets,
        totalUrgentTickets,
        totalOpenTickets,
        totalResolvedTickets: 0,
        averageResolvedPerDay: 0,
      };
    }

    const firstResolvedDate = resolvedTickets.reduce((earliest, ticket) => {
      return ticket.resolvedAt < earliest ? ticket.resolvedAt : earliest;
    }, resolvedTickets[0].resolvedAt);

    const lastResolvedDate = resolvedTickets.reduce((latest, ticket) => {
      return ticket.resolvedAt > latest ? ticket.resolvedAt : latest;
    }, resolvedTickets[0].resolvedAt);

    const daysBetween = Math.max(1, (lastResolvedDate.getTime() - firstResolvedDate.getTime()) / (1000 * 60 * 60 * 24));
    const averageResolvedPerDay = Math.ceil(resolvedTickets.length / daysBetween);

    return {
      totalTickets,
      totalUrgentTickets,
      totalOpenTickets,
      totalResolvedTickets,
      averageResolvedPerDay,
    };
  }
}
