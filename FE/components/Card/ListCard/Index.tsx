import { TicketStatus } from "@/types/ticket.type";
import { ReactNode } from "react";

interface ListCardProps {
    title: string;
    subtitle?: ReactNode;
    date: string;
    status: TicketStatus;
    action?: ReactNode
}

export default function ListCard({ title, subtitle, date, action }: ListCardProps) {
    return (
        <div className="card bg-base-100 shadow-xl hover:shadow-2xl transition-transform transform hover:scale-105 duration-300">
            <div className="card-body p-3">
                <div className="flex justify-between items-center px-2">
                    <div className="flex flex-col gap-2">
                        <h3 className="font-semibold text-left">{title}</h3>
                        {subtitle}
                    </div>

                    <div className="flex flex-col items-end gap-4">
                        <span className="text-sm text-base-content/70">{date}</span>
                        {action}
                    </div>
                </div>
            </div>
        </div>
    );
}