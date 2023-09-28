import React from 'react';
import type { Metadata } from 'next';
import 'tailwindcss/tailwind.css';
import '../styles/globals.css';

import { ReduxProvider } from '../redux/Provider';

export const metadata: Metadata = {
    title: 'Deliverit',
    description: 'Init your work day with Deliverit',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className='bg-primary'>
                <ReduxProvider>
                    <>{children}</>
                </ReduxProvider>
            </body>
        </html>
    );
}
