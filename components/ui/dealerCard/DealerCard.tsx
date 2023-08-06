import React, { FC } from 'react';
import { CircularProgress } from '../../commons/circular-progress/CircularProgress';
import { StatusBadge } from '../statusBadge/StatusBadge';

import { CircularImage } from '../../commons/circular-image/CircularImage';
import { IDealer } from '../../../interfaces/IDealer';

export const DealerCard: FC<{ dealer: IDealer }> = ({ dealer }) => {
    const { name, workState, urlImage, totalPackages, deliveredPackages } =
        dealer;

    const percentage = totalPackages
        ? Math.floor((deliveredPackages / totalPackages) * 100)
        : 0;

    return (
        <div className='h-100 w-full bg-white flex items-center justify-between border-dotted border-t-2 '>
            <div className='w-73 h-73 bg-white rounded-full flex items-center justify-center'>
                <CircularProgress percentage={percentage} />
                <div className='flex flex-col ml-2'>
                    <span className='mb-2 text-primary text-xl font-extrabold leading-4'>
                        {name}
                    </span>
                    <StatusBadge status={workState} />
                </div>
            </div>

            <div className='w-40.27 h-40.27 bg-red-500 rounded-full flex items-center justify-center'>
                <CircularImage src={urlImage} alt='Farid' diameter={60} />
            </div>
        </div>
    );
};
