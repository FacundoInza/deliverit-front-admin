'use client';

import React from 'react';
import { useAppSelector } from '../../../hooks/useAppSelector';
import { deliveries } from '../../../redux/features/deliveries/deliveriesSelector';

interface SwitchProps {
    workerId: string;
    initialStatus: string;
    handleSwitchClick: () => void;
}

export const Switch: React.FC<SwitchProps> = ({
    initialStatus,
    handleSwitchClick,
}) => {
    const { data } = useAppSelector(deliveries);

    const toggle = () => {
        handleSwitchClick();
    };

    const serverSideRendering = !data.status || data.status === '';
    const statusClass =
        initialStatus === 'active'
            ? 'bg-white border-primary'
            : 'bg-gray-400 border-gray-600';
    const statusClass2 =
        data.status === 'active'
            ? 'bg-white border-primary'
            : 'bg-gray-400 border-gray-600';

    const statusClass3 =
        initialStatus === 'active' ? 'translate-x-6 bg-secondary' : '';

    const statusClass4 =
        data.status === 'active' ? 'translate-x-6 bg-secondary' : '';

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
                            checked={data.status === 'active'}
                        />
                        <div
                            className={`block ${
                                serverSideRendering ? statusClass : statusClass2
                            } border-solid border-2 w-14 h-8 rounded-full`}
                        ></div>
                        <div
                            className={`absolute left-1 top-1 bg-gray-200 w-6 h-6 rounded-full transition-transform duration-300 transform ${
                                serverSideRendering
                                    ? statusClass3
                                    : statusClass4
                            }`}
                        />
                    </div>
                </label>
            </div>
        </div>
    );
};
