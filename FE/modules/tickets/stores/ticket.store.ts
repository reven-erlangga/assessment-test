import { makeAutoObservable } from "mobx";
import { ACTIVITY, CREATE, CreateTicketInput, FETCH_TICKET, FIND_BY_ID, UPDATE, UpdateTicketInput } from "../schema/tickets.schema";
import { Ticket, TicketActivity, TicketStatus } from "@/types/ticket.type";

interface Response<T> {
    data?: T;
    loading?: boolean;
    error?: string | null;
}

class TicketStore {
    fetchDataResponse: Response<Ticket[]> = {
        data: [],
        loading: true,
        error: null,
    };
    findByIDResponse: Response<Ticket | null> = {
        data: null,
        loading: false,
        error: null,
    };
    createResponse: Response<Ticket | null> = {
        data: null,
        loading: false,
        error: null,
    };
    updateResponse: Response<Ticket | null> = {
        data: null,
        loading: false,
        error: null,
    };
    removeResponse: Response<Ticket | null> = {
        data: null,
        loading: false,
        error: null,
    };
    activityResponse: Response<TicketActivity | null> = {
        data: null,
        loading: false,
        error: null,
    }

    constructor() {
        makeAutoObservable(this);
    }

    async fetch() {
        this.fetchDataResponse.loading = true;
        this.fetchDataResponse.error = null;

        try {
            const { data } = await FETCH_TICKET();

            this.fetchDataResponse.data = data.tickets;
        } catch (err) {
            if (err instanceof Error) {
                this.fetchDataResponse.error = err.message;
            } else {
                this.fetchDataResponse.error = "An unknown error occurred";
            }
        } finally {
            this.fetchDataResponse.loading = false;
        }
    }

    async findByID(id: string) {
        this.findByIDResponse.loading = true;
        this.findByIDResponse.error = null;

        try {
            const { data } = await FIND_BY_ID(id);

            this.findByIDResponse.data = data;
        } catch (err) {
            if (err instanceof Error) {
                this.fetchDataResponse.error = err.message;
            } else {
                this.fetchDataResponse.error = "An unknown error occurred";
            }
        } finally {
            this.findByIDResponse.loading = false;
        }
    }

    async create(input: CreateTicketInput) {
        this.createResponse.loading = true;
        this.createResponse.error = null;

        try {
            const { data } = await CREATE(input);

            this.createResponse.data = data;
        } catch (err) {
            if (err instanceof Error) {
                this.createResponse.error = err.message;
            } else {
                this.createResponse.error = "An unknown error occurred";
            }
        } finally {
            this.createResponse.loading = false;
        }
    }

    async update(input: UpdateTicketInput) {
        this.updateResponse.loading = true;
        this.updateResponse.error = null;

        try {
            const { data } = await UPDATE(input);

            this.updateResponse.data = data;
        } catch (err) {
            if (err instanceof Error) {
                this.updateResponse.error = err.message;
            } else {
                this.updateResponse.error = "An unknown error occurred";
            }
        } finally {
            this.updateResponse.loading = false;
        }
    }

    async markAsDone(id: string) {
        this.removeResponse.loading = true;
        this.removeResponse.error = null;

        try {
            const { data } = await UPDATE({
                id,
                status: TicketStatus.Resolved,
            });

            this.removeResponse.data = data;
        } catch (err) {
            if (err instanceof Error) {
                this.fetchDataResponse.error = err.message;
            } else {
                this.fetchDataResponse.error = "An unknown error occurred";
            }
        } finally {
            this.removeResponse.loading = false;

            await this.fetch();
            await this.activity();
        }
    }

    async activity() {
        this.activityResponse.loading = true;
        this.activityResponse.error = null;

        try {
            const { data } = await ACTIVITY();

            this.activityResponse.data = data;
        } catch (err) {
            if (err instanceof Error) {
                this.activityResponse.error = err.message;
            } else {
                this.activityResponse.error = "An unknown error occurred";
            }
        } finally {
            this.activityResponse.loading = false;
        }
    }
}

const ticketStore = new TicketStore();
export { ticketStore };
export const fetchTickets = ticketStore.fetch.bind(ticketStore);
export const findByID = ticketStore.findByID.bind(ticketStore);
export const createTicket = ticketStore.create.bind(ticketStore);
export const updateTicket = ticketStore.update.bind(ticketStore);
export const removeTicket = ticketStore.markAsDone.bind(ticketStore);
export const fetchActivity = ticketStore.activity.bind(ticketStore);