import { ReactNode } from 'react';

interface HeadingProps {
    title: string;
    button?: ReactNode;
}

const Heading = ({ title, button }: HeadingProps) => {
    return (
        <div className="w-full pb-6 flex justify-center items-center mb-8">
            <div className="flex flex-wrap gap-4 items-center">
                {button && <div>{button}</div>}
                <h1 className="text-xl font-bold text-center">{title}</h1>
            </div>
        </div>
    );
};

export default Heading;