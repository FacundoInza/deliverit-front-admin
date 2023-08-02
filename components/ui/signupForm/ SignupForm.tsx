'use client';

import React, { FC, FormEvent, useState } from 'react';
import MainButton from '../../commons/buttons/MainButton';
import {
    RiUserLine,
    RiLockFill,
    RiEyeFill,
    RiEyeOffFill,
} from 'react-icons/ri';
import { useForm } from '../../../hooks/useForm';

import Link from 'next/link';

// type SignUpParams = {
//     email: string;
//     password: string;
//     username: string;
// };

// const signUp = async (params: SignUpParams) => {
//     try {
//         const user = await Auth.signUp(params);
//         if (user.userConfirmed) {
//             window.location.href = '/';
//         } else {
//             window.location.href = '/confirm';
//         }
//         console.log(user);
//     } catch (error) {
//         console.log(error);
//         alert(error);
//         window.location.href = '/';
//     }
// };

export const SignupForm: FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const { values, handleChange } = useForm({
        email: '',
        password: '',
        repeatPassword: '',
    });

    const handleSubmit = async (event: FormEvent) => {
        const { email, password } = values;
        event.preventDefault();
        console.log(values);
        console.log(email);
        console.log(password);
        setIsAuthenticated(true);
    };

    return (
        <>
            {isAuthenticated && <div>User Authenticated</div>}
            <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='mt-10 sm:mx-auto sm:w-full sm:max-w-sm'>
                    <form
                        className='space-y-6'
                        action='#'
                        method='POST'
                        onSubmit={handleSubmit}
                    >
                        <div>
                            <div className='relative mt-2'>
                                <input
                                    placeholder='your@email.com'
                                    id='email'
                                    name='email'
                                    type='email'
                                    value={values.email}
                                    autoComplete='email'
                                    required
                                    onChange={handleChange}
                                    className='block w-full rounded-lg border-1 px-12 py-3.5 text-primary shadow-sm ring-1 ring-inset ring-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 bg-transparent'
                                />
                                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                                    <RiUserLine size={25} />
                                </span>
                            </div>
                        </div>

                        <div>
                            <div className='relative mt-2'>
                                <input
                                    id='password'
                                    name='password'
                                    type={showPassword ? 'text' : 'password'}
                                    value={values.password}
                                    placeholder='YourUltraSecretPassword'
                                    autoComplete='current-password'
                                    required
                                    onChange={handleChange}
                                    className='block w-full rounded-lg border-1 px-12 py-3.5 text-primary shadow-sm ring-1 ring-inset ring-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 bg-transparent'
                                />
                                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                                    <RiLockFill size={25} />
                                </span>
                                <span
                                    className='absolute z-50 right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer'
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                >
                                    {showPassword ? (
                                        <RiEyeOffFill size={25} />
                                    ) : (
                                        <RiEyeFill size={25} />
                                    )}
                                </span>
                            </div>
                        </div>
                        <div>
                            <div className='relative mt-2'>
                                <input
                                    id='repeatPassword'
                                    name='repeatPassword'
                                    type={
                                        showRepeatPassword ? 'text' : 'password'
                                    }
                                    value={values.repeatPassword}
                                    placeholder='YourUltraSecretPassword'
                                    autoComplete='current-password'
                                    required
                                    onChange={handleChange}
                                    className='block w-full rounded-lg border-1 px-12 py-3.5 text-primary shadow-sm ring-1 ring-inset ring-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-sm sm:leading-6 bg-transparent'
                                />
                                <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                                    <RiLockFill size={25} />
                                </span>
                                <span
                                    className='absolute z-50 right-3 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer'
                                    onClick={() =>
                                        setShowRepeatPassword(
                                            !showRepeatPassword
                                        )
                                    }
                                >
                                    {showRepeatPassword ? (
                                        <RiEyeOffFill size={25} />
                                    ) : (
                                        <RiEyeFill size={25} />
                                    )}
                                </span>
                            </div>
                        </div>
                        <div className='space-y-6'>
                            <div className='mt-20 '>
                                <Link href='/confirm'>
                                    <MainButton
                                        text='Create Account'
                                        btnGreen
                                    />
                                </Link>
                            </div>
                            <div>
                                <div className='flex items-center justify-center'>
                                    <div className='text-base'>
                                        <p className='font-normal text-primary'>
                                            Already have an account?
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    <Link href='/'>
                        <MainButton text='Sign In' btnBlue />
                    </Link>
                </div>
            </div>
        </>
    );
};
