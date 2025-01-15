import createApolloClient from "@/apollo-client";
import { Ticket, TicketActivity, TicketPriority, TicketStatus } from "@/types/ticket.type";
import gql from "graphql-tag";

export const FETCH_TICKETS_QUERY = gql`
    query FetchTickets {
        tickets {
            id
            title
        }
    }
`;


export const FETCH_TICKET = async () => {
    const client = createApolloClient();
    const { loading, data, error } = await client.query<{ tickets: Ticket[] }>({
        query: gql`
            query FetchTickets {
                tickets {
                    id
                    title
                    priority
                    status
                }
            }
        `,
    });

    return { loading, data, error };
}

export const FIND_BY_ID = async (id: string) => {
    const client = createApolloClient();
    const { data, errors } = await client.query<{ ticket: Ticket }>({
        query: gql`
            query Ticket($id: String!) {
                ticket(id: $id) {
                    id
                    title
                    priority
                    description
                    status
                }
            }
        `,
        variables: {
            id
        }
    });

    return { data: data?.ticket, errors };
}

export interface CreateTicketInput {
    title: string;
    priority: TicketPriority;
    status: TicketStatus;
    description: string;
}

export const CREATE = async (input: CreateTicketInput) => {
    const client = createApolloClient();
    const { data, errors } = await client.mutate<{ createTicket: Ticket }>({
        mutation: gql`
            mutation CreateTicket($createTicketInput: CreateTicketInput!) {
                createTicket(createTicketInput: $createTicketInput) {
                    id
                    title
                    priority
                    description
                    status
                }
            }
        `,
        variables: {
            createTicketInput: input
        }
    });

    return { data: data?.createTicket, errors };
}

export interface UpdateTicketInput {
    id: string;
    title?: string;
    description?: string;
    priority?: TicketPriority;
    status?: TicketStatus;
}

export const UPDATE = async (input: UpdateTicketInput) => {
    const client = createApolloClient();
    const { data, errors } = await client.mutate<{ updateTicket: Ticket }>({
        mutation: gql`
            mutation UpdateTicket($updateTicketInput: UpdateTicketInput!) {
                updateTicket(updateTicketInput: $updateTicketInput) {
                    id
                    title
                    priority
                    description
                    status
                }
            }
        `,
        variables: {
            updateTicketInput: input
        }
    });

    return { data: data?.updateTicket, errors };
}

export const ACTIVITY = async () => {
    const client = createApolloClient();
    const { data, errors } = await client.query<{ ticketActivity: TicketActivity }>({
        query: gql`
            query TicketActivity {
                ticketActivity {
                    totalTickets
                    totalUrgentTickets
                    totalOpenTickets
                    totalResolvedTickets
                    averageResolvedPerDay
                }
            }
        `
    });

    return { data: data?.ticketActivity, errors };
}

