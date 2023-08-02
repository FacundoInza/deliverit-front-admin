import { SVGAttributes } from 'react';
import React from 'react';

export function ArrowLeftCircleIcon(props: SVGAttributes<SVGElement>) {
    return (
        <svg
            fill='none'
            stroke='currentColor'
            strokeWidth='1.5'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
            aria-hidden='true'
            {...props}
        >
            <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            ></path>
        </svg>
    );
}
