import classNames from 'classnames';

interface MiniCardProps {
    total: number;
    subtitle: string;
    className?: string;
}

export default function MiniCard({ total, subtitle, className }: MiniCardProps) {
    return (
        <div className={classNames("flex flex-col gap-2 stat text-center bg-base-100 shadow rounded-lg w-auto px-2 py-6 shadow shadow-xl min-h-32", className)}>
            <div className="stat-title text-success text-3xl font-semibold">{total}</div>
            <div className="stat-desc text-xs break-words whitespace-normal">{subtitle}</div>
        </div>
    );
}