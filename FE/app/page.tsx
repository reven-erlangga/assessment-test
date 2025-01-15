"use client"; // This is a client component 👈🏽

import { PlusOutlined } from "@ant-design/icons";
import { useRouter } from 'next/navigation';
import ListTicket from '../modules/tickets/parts/List';

import { useEffect, useState } from 'react';

import SearchTicket from "@/modules/tickets/parts/Search";
import ActivityTicket from "@/modules/tickets/parts/Activity";

export default function Home() {
  const router = useRouter()

  const [requests] = useState([
    {
      id: 1,
      title: 'Front Door Lock Broken',
      date: '15 Nov 2024',
      status: 'Mark as Resolved',
      priority: 'Urgent',
      priorityIcon: '🔸'
    },
    {
      id: 2,
      title: 'Tile Cracked',
      date: '15 Dec 2024',
      status: 'Mark as Resolved',
      priority: 'Non Urgent',
      priorityIcon: '💛'
    },
    {
      id: 3,
      title: 'Water Pipe Leaking',
      date: '15 Nov 2024',
      status: 'Resolved',
      priority: 'Emergency',
      priorityIcon: '🔥'
    },
    {
      id: 4,
      title: 'Cornice Cracked',
      date: '15 Nov 2024',
      status: 'Resolved',
      priority: 'Less Urgent',
      priorityIcon: '📞'
    }
  ]);

  return (
    <div className="min-h-screen bg-transparent p-4 max-w-full lg:max-w-[40vw] mx-auto pt-20">
      {/* Heading */}
      <div className="w-full mb-6 text-center justify-center items-center mb-8">
        <h1 className="text-xl font-bold text-center">Maintenance Request</h1>
      </div>

      {/* Stats Section */}
      <ActivityTicket />

      <SearchTicket />

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
