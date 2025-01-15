import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CronService {
    constructor(
        private readonly prisma: PrismaService,
    ) { }

    @Cron(CronExpression.EVERY_HOUR)
    async handleCron() {
        const now = new Date();

        const lessUrgentThreshold = new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000); // 3 days
        await this.prisma.ticket.updateMany({
            where: {
                priority: 'LESS_URGENT',
                createdAt: { lte: lessUrgentThreshold },
            },
            data: { priority: 'URGENT' },
        });

        const urgentThreshold = new Date(now.getTime() - 6 * 60 * 60 * 1000); // 6 hours
        await this.prisma.ticket.updateMany({
            where: {
                priority: 'URGENT',
                createdAt: { lte: urgentThreshold },
            },
            data: { priority: 'EMERGENCY' },
        });
    }
}
