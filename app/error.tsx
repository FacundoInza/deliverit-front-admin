'use client'; // Error components must be Client Components

import { useEffect } from 'react';
import React from 'react';
import Link from 'next/link';
import logo from '../assets/deliverit-full.png';
import Image from 'next/image';
import { Navbar } from '../components/ui/navbar';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <html lang='en'>
            <body className='bg-primary'>
                <nav className='bg-primary'>
                    <Navbar isAuthenticated={true} />
                </nav>
                <div className='text-white bg-primary text-4xl font-bold text-center mt-48'>
                    Something went wrong
                    <button
                        onClick={
                            // Attempt to recover by trying to re-render the segment
                            () => reset()
                        }
                    >
                        Try again
                    </button>
                    <div className='text-2xl font-bold text-center mt-8 underline hover:text-secondary'>
                        <Link href='/'>Return to homepage</Link>
                    </div>
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
                </div>{' '}
            </body>
        </html>
    );
}
