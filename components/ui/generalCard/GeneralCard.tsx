'use client';

import 'tailwindcss/tailwind.css';
import React, { ReactNode } from 'react';
import { ArrowLeftCircleIcon } from '../../commons/SVG/ArrowLeftCircle';

import { useRouter } from 'next/navigation';

interface GeneralCardProps {
    title: string;
    children: ReactNode;
}

export const GeneralCard: React.FC<GeneralCardProps> = ({
    title,
    children,
}) => {
    const router = useRouter();

    const handleClick = () => {
        router.back();
    };
    return (
        <>
            <div className='mt-6 ml-4 mr-4 lg:ml-60 lg:mr-60 bg-white rounded-xl relative'>
                <div className='bg-info py-4 px-4 rounded-t-xl h-20 flex items-center'>
                    <button className='absolute' onClick={handleClick}>
                        <div className='h-10 w-10 mr-2 text-primary'>
                            <ArrowLeftCircleIcon />
                        </div>
                    </button>

                    <p className='text-2xl font-semibold text-primary flex-grow ml-14'>
                        {title}{' '}
                    </p>
                </div>

                <div className='px-2 py-6'>{children}</div>
            </div>
        </>
    );
};
