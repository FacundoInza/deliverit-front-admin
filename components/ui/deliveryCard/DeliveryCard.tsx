import React from 'react';
import { useState } from 'react';
import { StatusBadge } from '../statusBadge/StatusBadge';
import { PiPackageThin } from 'react-icons/pi';
import { RiDeleteBin6Line } from 'react-icons/ri';
import Link from 'next/link';
import axios from 'axios';
import ModalDelete from '../../commons/modal/ModalDelete';

interface CardProps {
    deliveryID: string;
    deliveryAddress: string;
    status: string;
    showCancel: boolean;
    key: string;
    recipient?: string;
    onDeleteSuccess?: () => void;
}

const colorMap: { [key: string]: string } = {
    delivered: 'text-delivered',
    'in progress': 'text-inProgress',
    pending: 'text-pending',
    inactive: 'text-gray-500',
};

export const DeliveryCard: React.FC<CardProps> = ({
    deliveryID,
    deliveryAddress,
    status,
    showCancel,
    onDeleteSuccess,
}) => {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isModalSuccess, setIsModalSuccess] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    const handleDeleteClick = async () => {
        setModalMessage('Are you sure you want to delete?');
        setIsModalSuccess(true);
        setShowModal(true);
    };

    const handleDeleteConfirm = async () => {
        setShowModal(false);

        setIsDeleting(true);

        try {
            await axios.delete(
                `${process.env.NEXT_PUBLIC_BASE_URL}/api/order/${deliveryID}`
            );
            setShowSuccessMessage(true);
        } catch (error) {
            setModalMessage((error as Error).message);
            setIsModalSuccess(false);
            setShowModal(true);
        } finally {
            setIsDeleting(false);
        }
    };

    const handleDeleteCancel = () => {
        setShowModal(false);
    };

    const handleSuccessMessageClose = () => {
        setShowSuccessMessage(false);
        onDeleteSuccess && onDeleteSuccess();
    };

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <>
            {showModal && (
                <ModalDelete
                    isSuccess={isModalSuccess}
                    message={modalMessage}
                    onClose={handleDeleteConfirm}
                    onCancel={handleDeleteCancel}
                />
            )}

            {showSuccessMessage && (
                <div className='bg-green-200 text-green-800 p-2 text-center mb-2'>
                    <p>The order was deleted</p>
                    <button
                        onClick={handleSuccessMessageClose}
                        className='bg-green-500 text-white px-2 py-1 rounded-full mt-2'
                    >
                        Ok
                    </button>
                </div>
            )}

            <Link href='/manage-packages'>
                <div className='bg-white border border-primary rounded-2xl p-1 flex justify-center items-center space-x-2 text-primary relative h-[90px] mb-2'>
                    <div className='ml-1 w-1/8'>
                        <span className={colorMap[status]}>
                            <PiPackageThin size={40} />
                        </span>
                    </div>
                    <div className='flex-grow flex-col just space-y-1 border-l border-dashed border-gray-400 mx-1 px-2'>
                        <h3 className='text-lg font-semibold'>
                            {'#' + deliveryID.substring(17, 24)}
                        </h3>
                        <div className='mr-[40px]'>
                            <p>
                                <span
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    {isHovered
                                        ? deliveryAddress
                                        : `${deliveryAddress.slice(0, 40)}...`}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className='flex flex-col align-bottom absolute top-4 right-1'>
                        <StatusBadge status={status} />
                        {showCancel ? (
                            <div className='mt-2 flex flex-col justify-end'>
                                <button
                                    className='flex justify-end text-red-500 hover:text-red-700'
                                    onClick={handleDeleteClick}
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
            </Link>
        </>
    );
};
