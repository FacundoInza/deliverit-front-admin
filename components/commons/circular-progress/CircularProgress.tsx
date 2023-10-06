'use client';

import React, { FC } from 'react';
import './CircularProgress.css';
import { keyframes, styled } from 'styled-components';

interface Props {
    percentage: number;
}

export const CircularProgress: FC<Props> = ({ percentage = 100 }) => {
    const rotateAnimation = keyframes`
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(calc(3.6deg * ${percentage}));
        }
    `;

    const circleStyles = {
        stroke: '#00EA77',
        strokeDasharray: 283,
        strokeDashoffset: `calc(283 - (283 * ${percentage}) / 100)`,
        animation: 'fadeIn 1s linear forwards',
        opacity: 0,
        animationDelay: '2s',
    } as React.CSSProperties;

    const AnimatedDot = styled.div`
        position: absolute;
        inset: 5px;
        z-index: 15;
        transform: rotate(calc(3.6deg * ${percentage}));
        animation: ${rotateAnimation} 1s linear forwards;

        &::before {
            content: '';
            left: 50%;
            transform: translateX(-50%);
            position: absolute;
            z-index: 15;
            width: 15px;
            height: 15px;
            border-radius: 50%;
            background: #80ed99;
            box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.25);
        }
    `;

    return (
        <>
            <div className='container'>
                <div className='card'>
                    <div className='percent'>
                        <AnimatedDot />
                        <svg>
                            <circle cx='45' cy='45' r='45'></circle>
                            <circle
                                cx='45'
                                cy='45'
                                r='45'
                                style={circleStyles}
                            ></circle>
                        </svg>
                        <div className='number'>
                            <h2>
                                {percentage}
                                <span>%</span>
                            </h2>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
