import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ticketStore, fetchTickets, removeTicket } from "../stores/ticket.store";
import { ThunderboltOutlined, CheckCircleOutlined, SmileOutlined, FireOutlined } from "@ant-design/icons";
import { Ticket, TicketPriority, TicketStatus } from "@/types/ticket.type";

import ListCard from "@/components/Card/ListCard/Index";
import Link from 'next/link'
import { formatDate } from "@/utilities/formatter.utility";

const ListTicket = observer(() => {
    useEffect(() => {
        fetchTickets();
    }, []);

    if (ticketStore.fetchDataResponse.error) {
        return <div>Error: {ticketStore.fetchDataResponse.error} </div>;
    }

    const ActionButtonElement = ({ ticket, onClick }: { ticket: Ticket, onClick: (event: React.MouseEvent<HTMLButtonElement>) => void }) => {
        switch (ticket.status) {
            case TicketStatus.Resolved:
                return (
                    <button className="btn btn-success btn-sm text-white text-xs disabled:bg-gray-600 disabled:text-white" onClick={(event) => event.stopPropagation()} disabled>
                        Resolved
                    </button>
                );
            case TicketStatus.Open:
                return (
                    <button className="btn btn-primary btn-sm text-white text-xs" onClick={(event) => { event.stopPropagation(); onClick(event); }}>
                        Mark as Resolved
                    </button>
                );
            default:
                return <span>Unknown Status</span>;
        }
    };

    const SubtitleElement = (ticket: Ticket) => {
        let priorityElement;
        switch (ticket.priority) {
            case TicketPriority.NonUrgent:
                priorityElement = (
                    <div className="flex items-center gap-2 text-success">
                        <SmileOutlined />
                        <span className="text-sm text-base-content/70 first-letter:text-capitalize">Non-Urgent</span>
                    </div>
                );
                break;
            case TicketPriority.LessUrgent:
                priorityElement = (
                    <div className="flex items-center gap-2 text-info">
                        <CheckCircleOutlined />
                        <span className="text-sm text-base-content/70 first-letter:text-capitalize">Less Urgent</span>
                    </div>
                );
                break;
            case TicketPriority.Emergency:
                priorityElement = (
                    <div className="flex items-center gap-2 text-error">
                        <FireOutlined />
                        <span className="text-sm text-base-content/70 first-letter:text-capitalize">Emergency</span>
                    </div>
                );
                break;
            case TicketPriority.Urgent:
                priorityElement = (
                    <div className="flex items-center gap-2 text-warning">
                        <ThunderboltOutlined />
                        <span className="text-sm first-letter:text-capitalize">Urgent</span>
                    </div>
                );
                break;
            default:
                priorityElement = <span>Unknown Priority</span>;
        }

        return priorityElement;
    };

    return (
        <div className="flex flex-wrap flex-col gap-4">
            {
                ticketStore.fetchDataResponse.data?.map((ticket) => (
                    <Link
                        key={ticket.id}
                        href={`/tickets/edit/${ticket.id}`}
                        className={`cursor-pointer ${ticket.status === TicketStatus.Resolved ? 'pointer-events-none opacity-50' : ''}`}
                    >
                        <ListCard
                            title={ticket.title}
                            subtitle={<SubtitleElement {...ticket} />}
                            date={formatDate(ticket.createdAt)}
                            status={ticket.status}
                            action={<ActionButtonElement ticket={ticket} onClick={(event) => {
                                event.preventDefault();
                                event.stopPropagation();
                                removeTicket(ticket.id);
                            }} />}
                        />
                    </Link>
                ))
            }
        </div>
    );
});

export default ListTicket;