'use client';

import React, { FC, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import Notification from '../modal/Notification';
import { deleteCookie } from 'cookies-next';
import { api } from '../../../api/axiosInstance';
import { LogoSvg } from '../../commons/SVG/LogoSvg';
import { LogOutSvg } from '../../commons/SVG/LogOutSvg';
import Link from 'next/link';

interface Props {
    isAuthenticated: boolean;
}

interface ErrorResponse {
    message: string;
}

export const Navbar: FC<Props> = ({ isAuthenticated }) => {
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isModalSuccess, setIsModalSuccess] = useState(false);
    const router = useRouter();

    const logout = async () => {
        try {
            await api.post('/api/user/logout');
            localStorage.removeItem('token');
            deleteCookie('token');
            setModalMessage('You have been logged out');
            setIsModalSuccess(true);
            setShowModal(true);
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError && axiosError.response) {
                setModalMessage(axiosError.response.data.message);
            } else {
                setModalMessage('Something went wrong on logout');
            }
        }
    };

    const handleCloseModal = () => {
        if (isModalSuccess) {
            router.push('/');
        } else {
            setShowModal(false);
        }
    };

    return (
        <>
            <div
                className='flex justify-between py-4 px-6 md:px-40 '
                style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
            >
                <Link href='/admin' className='text-2xl font-bold'>
                    <LogoSvg />
                </Link>
                {isAuthenticated && (
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            borderRadius: 5,
                            boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                        }}
                    >
                        <button
                            onClick={logout}
                            className='transition duration-300 ease-in-out transform hover:bg-blue-500 hover:text-white active:scale-95'
                        >
                            <LogOutSvg />
                        </button>
                    </div>
                )}
            </div>

            <Notification
                showModal={showModal}
                isSuccess={isModalSuccess}
                message={modalMessage}
                onClose={handleCloseModal}
                buttonText={isModalSuccess ? 'Go to home' : 'Retry'}
                singleButton={true}
            />
        </>
    );
};
