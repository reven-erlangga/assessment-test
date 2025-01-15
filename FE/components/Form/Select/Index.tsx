import { Field, ErrorMessage } from 'formik';
import { ReactNode } from 'react';

interface FormControlProps {
    label: string;
    name: string;
    placeholder?: string;
    options?: { value: string; label: string }[];
    className?: string;
}

const FormSelect = ({ label, name, placeholder, options, className }: FormControlProps) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">
                    {label} <span className="text-red-500">*</span>
                </span>
            </label>
            <Field as="select" name={name} className={`select select-bordered w-full shadow-lg ${className}`}>
                <option disabled value="">
                    {placeholder}
                </option>
                {options?.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </Field>

            <ErrorMessage name={name} component="div" className="text-error text-sm" />
        </div>
    );
};

export default FormSelect;