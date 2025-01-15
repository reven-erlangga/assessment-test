import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsResolver } from './tickets.resolver';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CronService } from './cron/cron.service';

@Module({
  providers: [TicketsResolver, TicketsService, CronService],
  imports: [PrismaModule]
})
export class TicketsModule { }
