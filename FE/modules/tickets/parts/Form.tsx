import * as Yup from 'yup';

import { Ticket, TicketPriority, TicketStatus } from "@/types/ticket.type";
import { formatText } from "@/utilities/formatter.utility";
import { Formik, Form } from 'formik';
import { createTicket, updateTicket } from "../stores/ticket.store";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import FormInput from '@/components/Form/Input/Index';
import FormSelect from '@/components/Form/Select/Index';
import FormTextarea from '@/components/Form/Textarea/Index';

const validationSchema = Yup.object({
    urgency: Yup.string().required('Urgency is required'),
    status: Yup.string().required('Status is required'),
    title: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
});

interface FormTicketProps {
    mode: 'create' | 'edit';
    ticket?: Ticket;
}

const FormTicket = ({ mode, ticket }: FormTicketProps) => {
    const { push } = useRouter();
    const [initialValues, setInitialValues] = useState({
        urgency: '',
        status: '',
        title: '',
        description: ''
    });

    useEffect(() => {
        if (mode === 'edit' && ticket) {
            setInitialValues({
                urgency: ticket.priority,
                status: ticket.status,
                title: ticket.title,
                description: ticket.description
            });
        }
    }, [mode, ticket]);

    return (
        <Formik
            initialValues={initialValues}
            enableReinitialize
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
                try {
                    if (mode === "create") {
                        await createTicket({
                            priority: values.urgency as TicketPriority,
                            status: values.status as TicketStatus,
                            title: values.title,
                            description: values.description,
                        });
                    } else if (mode === "edit" && ticket) {
                        await updateTicket({
                            id: ticket.id,
                            priority: values.urgency as TicketPriority,
                            status: values.status as TicketStatus,
                            title: values.title,
                            description: values.description,
                        });
                    }

                    push('/');
                } catch (error) {
                    console.error("Failed to create ticket:", error);
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ isSubmitting }) => (
                <Form className="space-y-4">
                    <div className="flex flex-wrap flex-col gap-4 mb-[50px]">

                        <FormSelect
                            label="Urgency"
                            name="urgency"
                            placeholder="Select Urgency Level"
                            options={Object.values(TicketPriority).map((priority) => ({
                                value: priority,
                                label: formatText(priority),
                            }))}
                        />

                        <FormSelect
                            label="Status"
                            name="status"
                            placeholder="Select Status"
                            options={Object.values(TicketStatus).map((status) => ({
                                value: status,
                                label: formatText(status),
                            }))}
                        />

                        <FormInput
                            label='Title'
                            name='title'
                            type='text'
                            placeholder='eg. Crack in plasterboard'
                        />

                        <FormTextarea
                            label='Description'
                            name='description'
                            placeholder='Describe the issue in detail'
                            rows={5}
                        />

                        <div className="mt-10 flex justify-center">
                            <button type="submit" className="btn btn-primary min-w-48" disabled={isSubmitting}>
                                {mode === "create" ? "Save" : "Update"}
                            </button>
                        </div>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default FormTicket;    