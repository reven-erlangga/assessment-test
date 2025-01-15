'use client'

import { ArrowLeftOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';

import FormTicket from '@/modules/tickets/parts/Form';
import Heading from '@/modules/tickets/parts/Heading';

export default function CreateTicket() {
    const router = useRouter()

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

            {/* Form */}
            <FormTicket mode='create' />
        </div>
    );
}