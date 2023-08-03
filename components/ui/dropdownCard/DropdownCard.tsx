'use client';

import 'tailwindcss/tailwind.css';
import React, { ReactNode } from 'react';

interface DropdownCardProps {
    title: string;
    subtitle: string;
    children: ReactNode;
    expanded: boolean;
    onExpand?: () => void;
}

export const DropdownCard: React.FC<DropdownCardProps> = ({
    title,
    subtitle,
    children,
    expanded,
    onExpand,
}) => {
    return (
        <>
            <div className='mt-2 ml-4 mr-4 lg:ml-80 lg:mr-80 py-2 px-2 bg-white rounded-xl border-0.5 border-primary'>
                <div className='text-center space-y-1 sm:text-left flex justify-between'>
                    <p className='text-xl my-2 font-semibold text-primary'>
                        {title}{' '}
                    </p>

                    <button onClick={onExpand} className='py-0 px-3'>
                        <svg
                            className={`h-6 w-6 ${
                                expanded ? 'transform rotate-180' : ''
                            }`}
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='currentColor'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M19 9l-7 7-7-7'
                            />
                        </svg>
                    </button>
                </div>
                <div>
                    <p className='pt-1 text-md font-medium flex text-primary'>
                        {subtitle}{' '}
                    </p>
                </div>

                {expanded && (
                    <div className='pt-1'>
                        <ul>{children}</ul>
                    </div>
                )}
            </div>
        </>
    );
};
