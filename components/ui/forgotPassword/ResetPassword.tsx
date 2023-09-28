import React, { FC, useRef, useState } from 'react';
import MainButton from '../../commons/buttons/MainButton';
import { RiLockFill, RiEyeFill, RiEyeOffFill } from 'react-icons/ri';
import { useForm } from 'react-hook-form';
import { AxiosError } from 'axios';
import Notification from '../modal/Notification';
import { useRouter } from 'next/navigation';
import { api } from '../../../api/axiosInstance';

interface ResetPasswordProps {
    email: string;
    token: string;
}

interface newPasswordInput {
    newPassword: string;
    repeatNewPassword: string;
}

interface ErrorResponse {
    message: string;
}

export const ResetPassword: FC<ResetPasswordProps> = ({ email, token }) => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm<newPasswordInput>({ mode: 'onBlur' });

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showRepeatNewPassword, setShowRepeatNewPassword] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [isModalSuccess, setIsModalSuccess] = useState(false);
    const router = useRouter();

    const onSubmit = async (data: newPasswordInput) => {
        try {
            const { newPassword } = data;
            const response = await api.post('/api/user/reset-password', {
                email,
                token,
                newPassword,
            });
            setModalMessage(response.data.message);
            setIsModalSuccess(true);
            setShowModal(true);
        } catch (error) {
            const axiosError = error as AxiosError<ErrorResponse>;
            if (axiosError && axiosError.response) {
                setModalMessage(axiosError.response.data.message);
            } else {
                setModalMessage('Something went wrong on reset password');
            }
            setIsModalSuccess(false);
            setShowModal(true);
        }
    };

    const handleCloseModal = () => {
        if (isModalSuccess) {
            router.push('/');
        } else {
            setShowModal(false);
        }
    };

    const password = useRef({});
    password.current = watch('newPassword', '');

    return (
        <>
            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-sm text-center text-white text-xl'>
                Alright! Now enter your new password:
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
                                id='newPassword'
                                type={showNewPassword ? 'text' : 'password'}
                                placeholder='Your Password'
                                autoComplete='current-password'
                                {...register('newPassword', {
                                    required: 'New Password is required',
                                    minLength: {
                                        value: 8,
                                        message:
                                            'Password must be at least 8 characters',
                                    },
                                })}
                                className='block w-full rounded-lg border-1 px-12 py-3.5 text-white shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400 focus:ring-white focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6 bg-transparent'
                            />
                            <span className='absolute left-3 top-1/2 transform -translate-y-6 text-gray-400'>
                                <RiLockFill size={25} />
                            </span>
                            <span
                                className='absolute z-30 right-3 top-1/2 transform -translate-y-6 text-gray-400 cursor-pointer'
                                onClick={() =>
                                    setShowNewPassword(!showNewPassword)
                                }
                            >
                                {showNewPassword ? (
                                    <RiEyeOffFill size={25} />
                                ) : (
                                    <RiEyeFill size={25} />
                                )}
                            </span>
                            <div style={{ height: '20px' }}>
                                {errors.newPassword && (
                                    <p className='text-red-400 text-right pe-2 text-sm'>
                                        {errors.newPassword.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className='relative mt-2'>
                            <input
                                id='repeatPassword'
                                type={
                                    showRepeatNewPassword ? 'text' : 'password'
                                }
                                placeholder='RepeatYourPassword'
                                autoComplete='current-password'
                                {...register('repeatNewPassword', {
                                    required: 'Please confirm password.',
                                    minLength: {
                                        value: 8,
                                        message:
                                            'Password must be at least 8 characters',
                                    },
                                    validate: (value) =>
                                        value === password.current ||
                                        'Passwords do not match',
                                })}
                                className='block w-full rounded-lg border-1 px-12 py-3.5 text-white shadow-sm ring-1 ring-inset ring-primary placeholder:text-gray-400 focus:ring-white focus:ring-inset focus:ring-gray-100 sm:text-sm sm:leading-6 bg-transparent'
                            />
                            <span className='absolute left-3 top-1/2 transform -translate-y-6 text-gray-400'>
                                <RiLockFill size={25} />
                            </span>
                            <span
                                className='absolute z-30 right-3 top-1/2 transform -translate-y-6 text-gray-400 cursor-pointer'
                                onClick={() =>
                                    setShowRepeatNewPassword(
                                        !showRepeatNewPassword
                                    )
                                }
                            >
                                {showRepeatNewPassword ? (
                                    <RiEyeOffFill size={25} />
                                ) : (
                                    <RiEyeFill size={25} />
                                )}
                            </span>
                            <div style={{ height: '20px' }}>
                                {errors.repeatNewPassword && (
                                    <p className='text-red-400 text-right pe-2 text-sm'>
                                        {errors.repeatNewPassword.message}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className='space-y-6'>
                        <div className='mt-20'>
                            <MainButton text='Reset Password' btnGreen />
                        </div>
                    </div>
                </form>
            </div>

            <Notification
                showModal={showModal}
                isSuccess={isModalSuccess}
                message={modalMessage}
                onClose={handleCloseModal}
                buttonText={isModalSuccess ? 'Login' : 'Retry'}
                singleButton={true}
            />
        </>
    );
};
