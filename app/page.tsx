import Image from 'next/image';
import React from 'react';
import logo from '../assets/deliverit-full.png';
import MainButton from '../components/commons/buttons/MainButton';
import Link from 'next/link';

const page = () => {
    return (
        <>
            <div className='flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8'>
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <Image
                        className='mx-auto h-30 w-auto'
                        width={900}
                        height={400}
                        src={logo}
                        alt='DeliverIT'
                        objectFit='cover'
                    />
                    <p className='text-center mt-8 text-xl text-white font-semibold'>
                        Delivering More Than Just Packages...
                    </p>
                    <div className='mt-24'>
                        <Link href={'/auth'}>
                            <MainButton text='Login' btnGreen />
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;
