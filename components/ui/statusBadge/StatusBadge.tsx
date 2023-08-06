import React from 'react';

interface BadgeProps {
    status: string;
}

interface ColorMap {
    [key: string]: {
        bg: string;
        text: string;
        ring: string;
    };
}

const colorMap: ColorMap = {
    delivered: {
        bg: 'bg-delivered',
        text: 'text-green-700',
        ring: 'ring-green-600',
    },
    'in progress': {
        bg: 'bg-inProgress',
        text: 'text-yellow-700',
        ring: 'ring-yellow-600',
    },
    pending: {
        bg: 'bg-pending',
        text: 'text-gray-700',
        ring: 'ring-gray-600',
    },
    inactive: {
        bg: 'bg-gray-500',
        text: 'text-purple-100',
        ring: 'ring-purple-600',
    },
};

export const StatusBadge: React.FC<BadgeProps> = ({ status }) => {
    const color = colorMap[status];
    if (!color) {
        console.error(`Status desconocido: ${status}`);
        return null;
    }
    return (
        <span
            className={`text-lg text-primary font-bold inline-flex items-center rounded-full ${color.bg} px-5 py-0.5 text-sm font-semibold ${color.text} `}
        >
            {status.toLocaleUpperCase()}
        </span>
    );
};
