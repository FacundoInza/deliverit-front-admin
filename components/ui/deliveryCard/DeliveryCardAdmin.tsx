import React from 'react';
import { StatusBadge } from '../statusBadge/StatusBadge';
import { PiPackageThin } from 'react-icons/pi';
import { RiDeleteBin6Line } from 'react-icons/ri';

interface CardProps {
    deliveryID: string;
    deliveryAddress: string;
    status: string;
    showCancel: boolean;
    key: string;
    recipient?: string;
    onDeleteSuccess?: () => void;
    isDeleting: boolean;
    handleDeleteClick: (status: string, deliveryID: string) => void;
}

const colorMap: { [key: string]: string } = {
    delivered: 'text-delivered',
    'in progress': 'text-inProgress',
    pending: 'text-pending',
    inactive: 'text-gray-500',
};

export const DeliveryCardAdmin: React.FC<CardProps> = ({
    deliveryID,
    deliveryAddress,
    status,
    showCancel,
    isDeleting,
    handleDeleteClick,
}) => {
    return (
        <>
            <div className='bg-white border border-primary rounded-2xl p-1 flex justify-center items-center space-x-2 text-primary relative h-[90px] mb-2'>
                <div className='ml-1 w-1/8'>
                    <span className={colorMap[status]}>
                        <PiPackageThin size={40} />
                    </span>
                </div>
                <div className='flex-grow flex-col just space-y-1 border-l border-dashed border-gray-400 mx-1 px-2'>
                    <h3 className='text-lg font-semibold'>
                        {'#' + deliveryID.substring(0, 7)}
                    </h3>
                    <div className='mr-[40px]'>
                        <p>{deliveryAddress}</p>
                    </div>
                </div>
                <div className='flex flex-col align-bottom absolute top-4 right-1'>
                    <StatusBadge status={status} />
                    {showCancel ? (
                        <div className='mt-2 flex flex-col justify-end'>
                            <button
                                className='flex justify-end text-red-500 hover:text-red-700'
                                onClick={() =>
                                    handleDeleteClick(status, deliveryID)
                                }
                                disabled={isDeleting}
                            >
                                <RiDeleteBin6Line color='red' size={30} />
                            </button>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </>
    );
};
