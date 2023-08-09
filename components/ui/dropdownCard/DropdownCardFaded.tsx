'use client';

import 'tailwindcss/tailwind.css';
import React, { ReactNode, useEffect, useState } from 'react';

interface DropdownCardProps {
    title: string;
    subtitle: string;
    children: ReactNode;
    expanded: boolean;
    onExpand?: () => void;
}

export const DropdownCardFaded: React.FC<DropdownCardProps> = ({
    title,
    subtitle,
    children,
    expanded,
    onExpand,
}) => {
    const [fadedActive, setFadedActive] = useState(true);
    const [bottomReference, setBottomReference] = useState(304);

    useEffect(() => {
        if (expanded) {
            const divElement = document.getElementById('fadedParent');

            divElement?.addEventListener('scroll', () => {
                const visibleHeight = divElement.clientHeight;
                const totalHeight = divElement.scrollHeight;
                const scrollHeight = totalHeight - visibleHeight;
                const bottom = scrollHeight - divElement.scrollTop;

                if (bottom === 0) {
                    setFadedActive(false);
                } else {
                    setFadedActive(true);
                }
                setBottomReference(608 - bottom);
            });
        }
    }, [expanded]);

    const gradientBottom = {
        WebkitMaskImage: `linear-gradient(to bottom, white 0px, white ${
            bottomReference - 130
        }px, transparent ${bottomReference}px)`,
        maskImage: `linear-gradient(to bottom, white ${
            bottomReference - 130
        }px, transparent ${bottomReference}px)`,
    };

    return (
        <>
            <div className='mt-2 ml-4 mr-4 lg:ml-60 lg:mr-60 py-2 px-2 bg-white rounded-xl border-0.5 border-primary'>
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
                    <div
                        id='fadedParent'
                        className='pt-1 max-h-72 overflow-auto'
                    >
                        <ul
                            id='faded'
                            style={fadedActive ? gradientBottom : {}}
                        >
                            {children}
                        </ul>
                    </div>
                )}
            </div>
        </>
    );
};
