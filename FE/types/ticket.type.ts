export enum TicketStatus {
    Resolved = 'RESOLVED',
    Open = 'OPEN',
}

export enum TicketPriority {
    Urgent = 'URGENT',
    NonUrgent = 'NON_URGENT',
    Emergency = 'EMERGENCY',
    LessUrgent = 'LESS_URGENT',
}

export interface Ticket {
    id: string
    title: string
    priority: TicketPriority
    status: TicketStatus
    description: string
    createdAt: Date
}

export interface TicketActivity {
    totalTickets: number
    totalUrgentTickets: number
    totalOpenTickets: number
    totalResolvedTickets: number
    averageResolvedPerDay: number
}