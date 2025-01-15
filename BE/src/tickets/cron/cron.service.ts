import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CronService {
    private readonly timezone: string;

    constructor(
        private readonly prisma: PrismaService,
        private readonly configService: ConfigService,
    ) {
        this.timezone = this.configService.get<string>('TIMEZONE');
    }

    @Cron(CronExpression.EVERY_MINUTE)
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

        // Update Urgent tickets to Emergency after 6 hours
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
