import { Field, ErrorMessage } from 'formik';

interface FormControlProps {
    label: string;
    name: string;
    type?: string;
    placeholder?: string;
    className?: string;
}

const FormInput = ({ label, name, type = 'text', placeholder, className }: FormControlProps) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">
                    {label} <span className="text-red-500">*</span>
                </span>
            </label>
            <Field
                type={type}
                name={name}
                placeholder={placeholder}
                className={`input input-bordered w-full shadow-lg ${className}`}
            />
            <ErrorMessage name={name} component="div" className="text-error text-sm" />
        </div>
    );
};

export default FormInput;