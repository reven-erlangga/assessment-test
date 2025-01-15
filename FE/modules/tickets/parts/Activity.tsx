import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { ticketStore, fetchActivity } from "../stores/ticket.store";

import MiniCard from "@/app/components/Card/MiniCard";

const ActivityTicket = observer(() => {
    useEffect(() => {
        fetchActivity();
    }, []);

    const { data, error } = ticketStore.activityResponse;

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!data) {
        return <div>Data Not Found!</div>;
    }

    return (
        <div className="grid grid-cols-1 grid-cols-3 lg:grid-cols-5 gap-4 mb-20 justify-center items-center mx-auto">
            <MiniCard total={data.totalOpenTickets} subtitle="Open Requests" className="lg:col-start-2" />
            <MiniCard total={data.totalUrgentTickets} subtitle="Urgent Requests" />
            <MiniCard total={data.averageResolvedPerDay} subtitle="Average time |days| to resolve" />
        </div>
    );
});

export default ActivityTicket;