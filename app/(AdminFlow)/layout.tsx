import React from 'react';
import { Navbar } from '../../components/ui/navbar/Navbar';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div>
            <nav>
                <Navbar isAuthenticated={true} />
            </nav>

            <main>{children}</main>
        </div>
    );
}
