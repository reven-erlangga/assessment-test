"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from 'react';
import FormTicket from '@/modules/tickets/parts/Form';
import { findByID, ticketStore } from '@/modules/tickets/stores/ticket.store';
import { Ticket } from '@/types/ticket.type';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import Heading from "@/modules/tickets/parts/Heading";

const EditTicketPage = () => {
    const router = useRouter()
    const params = useParams();
    const id = params!.id as string;

    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (id) {
            const fetchTicket = async () => {
                try {
                    await findByID(id as string);
                    const data = ticketStore.findByIDResponse.data;
                    if (data) {
                        setTicket(data);
                    }
                } catch (error) {
                    console.error("Failed to fetch ticket:", error);
                } finally {
                    setLoading(false);
                }
            };
            fetchTicket();
        }
    }, [id]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!ticket) {
        return <div>Ticket not found</div>;
    }

    return (
        <div className="min-h-screen bg-transparent p-4 max-w-[30vw] mx-auto pt-20">
            {/* Heading */}
            <Heading
                title="Maintenance Request"
                button={
                    <button onClick={() => router.push('/')}>
                        <ArrowLeftOutlined />
                    </button>
                }
            />

            {/* Edit Form */}
            <FormTicket mode="edit" ticket={ticket} />
        </div>
    );
};

export default EditTicketPage;