'use client';

import Image from 'next/image';
import React, { FormEvent } from 'react';
import logo from '../../../assets/deliverit-full.png';
import MainButton from '../../commons/buttons/MainButton';
import { RiLockFill } from 'react-icons/ri';
import { useForm } from 'hooks/useForm';

export const UserConfirm = () => {
    const { values, handleChange } = useForm({
        code: '',
    });

    const handleSubmit = async (event: FormEvent) => {
        const { code } = values;
        const params = {
            code,
        };
        event.preventDefault();
        console.log(code);
        console.log(params);
        // await signUp(params);
        // setIsAuthenticated(true);
    };

    return (
        <div className='flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
            <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                <Image
                    className='mx-auto h-30 w-auto'
                    width={900}
                    height={400}
                    src={logo}
                    alt='DeliverIT'
                    objectFit='cover'
                />
            </div>
            <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-sm text-center text-white text-2xl'>
                Check your registration email and enter your code below:
            </div>
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
                                id='code'
                                name='code'
                                type='text'
                                placeholder='XXXXXX'
                                autoComplete='current-code'
                                required
                                onChange={handleChange}
                                className='block w-full rounded-lg border-1 px-12 py-3.5 text-white shadow-sm ring-1 ring-inset ring-white placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-gray-500 sm:text-xl text-center font-bold sm:leading-6 bg-transparent'
                            />
                            <span className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400'>
                                <RiLockFill size={25} />
                            </span>
                        </div>
                        <div className='flex items-center justify-end mt-2'>
                            <div className='text-base'>
                                <a
                                    href='#'
                                    className='font-semibold text-white hover:text-gray-300'
                                >
                                    Resend code
                                </a>
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
        </div>
    );
};
