import { Field, ErrorMessage } from 'formik';

interface FormControlProps {
    label: string;
    name: string;
    placeholder?: string;
    rows?: number;
    className?: string;
}

const FormTextarea = ({ label, name, placeholder, rows, className }: FormControlProps) => {
    return (
        <div className="form-control">
            <label className="label">
                <span className="label-text">
                    {label} <span className="text-red-500">*</span>
                </span>
            </label>

            <Field
                as="textarea"
                name={name}
                placeholder={placeholder}
                rows={rows}
                className={`textarea textarea-bordered w-full shadow-lg ${className}`}
            />

            <ErrorMessage name={name} component="div" className="text-error text-sm" />
        </div>
    );
};

export default FormTextarea;