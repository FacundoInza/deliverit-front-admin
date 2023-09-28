import React, { FC, useState } from 'react';
import MainButton from '../../commons/buttons/MainButton';
import { RiLockFill } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import Notification from '../modal/Notification';
import { api } from '../../../api/axiosInstance';

interface VerifyResetTokenProps {
    email: string;
    onSuccess: (token: string) => void;
    onNext: () => void;
}

interface CodeInput {
    token: string;
}

interface ErrorResponse {
    message: string;
}

export const VerifyResetToken: FC<VerifyResetTokenProps> = ({
    email,
    onNext,
    onSuccess,
}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<CodeInput>({ mode: 'onBlur' });

    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isModalSuccess, setIsModalSuccess] = useState(false);

    const onSubmit = async (data: CodeInput) => {
        try {
            const { token } = data;
            const response = await api.post('/api/user/verify-reset-token', {
                email,
                token,
            });
            if (response.data.isValid) {
                onSuccess(data.token);
                onNext();
            } else {
                setModalMessage('Invalid token. Please try again.');
                setIsModalSuccess(false);
                setShowModal(true);
            }
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError && axiosError.response) {
                setModalMessage(axiosError.response.data.message);
            } else {
                setModalMessage('Something went wrong verifying your token');
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
            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-sm text-center text-white text-2xl'>
                Check your registration email and enter your token below:
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
                                id='token'
                                type='text'
                                placeholder='XXXXXX'
                                autoComplete='token'
                                {...register('token', {
                                    required: 'Token is required',
                                    pattern: {
                                        value: /^\d+$/,
                                        message: 'Token must be a number',
                                    },
                                    maxLength: {
                                        value: 6,
                                        message: 'Token must be 6 digits',
                                    },
                                    minLength: {
                                        value: 6,
                                        message: 'Token must be 6 digits',
                                    },
                                })}
                                className='block w-full rounded-lg border-1 px-12 py-3.5 text-white shadow-sm ring-1 ring-inset ring-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-xl text-center font-bold sm:leading-6 bg-transparent'
                            />
                            <span className='absolute left-3 top-1/2 transform -translate-y-6 text-gray-400'>
                                <RiLockFill size={25} />
                            </span>
                            <div style={{ height: '20px' }}>
                                {errors.token && (
                                    <p className='text-red-400 text-right pe-2'>
                                        {errors.token.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className='space-y-6'>
                        <div className='mt-20'>
                            <MainButton text='Enter' btnGreen />
                        </div>
                    </div>
                </form>
            </div>
            {showModal && (
                <Notification
                    showModal={showModal}
                    isSuccess={isModalSuccess}
                    message={modalMessage}
                    onClose={handleCloseModal}
                    buttonText='Retry'
                    singleButton={true}
                />
            )}
        </>
    );
};
