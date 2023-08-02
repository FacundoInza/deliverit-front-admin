'use client';

import React, { FC, useState } from 'react';

export const Switch: FC = () => {
    const [isActive, setIsActive] = useState(false);

    const toggle = () => {
        console.log('Activated!');
        setIsActive(!isActive);
    };

    return (
        <div>
            <div className='flex items-center justify-center w-full mb-12'>
                <label className='flex items-center cursor-pointer'>
                    <div className='relative'>
                        <input
                            type='checkbox'
                            id='toggle'
                            className='sr-only'
                            onChange={toggle}
                            checked={isActive}
                        />
                        <div
                            className={`block ${
                                isActive
                                    ? 'bg-white border-primary'
                                    : 'bg-gray-400 border-gray-600'
                            } border border-solid border-2  w-14 h-8 rounded-full`}
                        ></div>
                        <div
                            className={`dot absolute left-1 top-1 ${
                                isActive ? 'bg-secondary' : 'bg-gray-200'
                            }  w-6 h-6 rounded-full transition-transform ${
                                isActive ? 'translate-x-full' : ''
                            }`}
                        ></div>
                    </div>
                </label>
            </div>
        </div>
    );
};
