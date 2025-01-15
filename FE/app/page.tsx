"use client";

import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from 'next/navigation';

import ListTicket from '../modules/tickets/parts/List';
import ActivityTicket from "@/modules/tickets/parts/Activity";

export default function Home() {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-transparent p-4 max-w-full lg:max-w-[40vw] mx-auto pt-20">
      {/* Heading */}
      <div className="w-full mb-6 text-center justify-center items-center mb-8">
        <h1 className="text-xl font-bold text-center">Maintenance Request</h1>
      </div>

      {/* Stats Section */}
      <ActivityTicket />

      {/* List Ticket Section */}
      <ListTicket />

      {/* Add New Request Button */}
      <div className="flex justify-end mt-10">
        <button className="btn btn-circle btn-success text-white" onClick={() => router.push('/tickets/create')}>
          <PlusOutlined />
        </button>
      </div>
    </div>
  );

}
