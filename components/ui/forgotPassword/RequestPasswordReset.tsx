import React, { FC, useState } from 'react';
import MainButton from '../../commons/buttons/MainButton';
import { RiUserLine } from 'react-icons/ri';
import { useForm } from 'react-hook-form';

import { AxiosError } from 'axios';
import Notification from '../modal/Notification';
import { api } from '../../../api/axiosInstance';

interface RequestPasswordResetProps {
    onSuccess: (email: string) => void;
    onNext: () => void;
}

interface emailInput {
    email: string;
}

interface ErrorResponse {
    message: string;
}

export const RequestPasswordReset: FC<RequestPasswordResetProps> = ({
    onSuccess,
    onNext,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<emailInput>({ mode: 'onBlur' });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isModalSuccess, setIsModalSuccess] = useState(false);

    const onSubmit = async (email: emailInput) => {
        try {
            const response = await api.post(
                '/api/user/request-password-reset',
                email
            );
            setModalMessage(response.data.message);
            setIsModalSuccess(true);
            onSuccess(email.email);
            onNext();
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError && axiosError.response) {
                setModalMessage(axiosError.response.data.message);
            } else {
                setModalMessage('Something went wrong on login');
            }
            setIsModalSuccess(false);
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    return (
        <>
            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-sm text-center text-white text-xl'>
                Enter your email below to reset your password:
            </div>
            <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                <form
                    className='space-y-6'
                    action='#'
                    method='POST'
                    onSubmit={handleSubmit(onSubmit)}
                >
                    <div>
                        <div className='relative mt-2'>
                            <input
                                id='email'
                                type='email'
                                placeholder='Your email here'
                                autoComplete='email'
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message:
                                            'Please enter a valid email address',
                                    },
                                })}
                                className='block w-full rounded-lg border-1 px-12 py-3.5 text-white shadow-sm ring-1 ring-inset ring-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 text-sm sm:text-sm text-center font-bold sm:leading-6 bg-transparent'
                            />
                            <span className='absolute left-3 top-1/2 transform -translate-y-6 text-gray-400'>
                                <RiUserLine size={25} />
                            </span>
                            <div style={{ height: '20px' }}>
                                {errors.email && (
                                    <p className='text-red-400 text-right pe-2'>
                                        {errors.email.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='space-y-6'>
                        <div className='mt-20'>
                            <MainButton text='Submit' btnGreen />
                        </div>
                    </div>
                </form>
            </div>

            <Notification
                showModal={showModal}
                isSuccess={isModalSuccess}
                message={modalMessage}
                onClose={handleCloseModal}
                buttonText={'Retry'}
                singleButton={true}
            />
        </>
    );
};
