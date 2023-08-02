import React, { FC } from 'react';
import { LogoSvg } from '../../commons/SVG/LogoSvg';
import { LogOutSvg } from '../../commons/SVG/LogOutSvg';

interface Props {
    isAuthenticated: boolean;
}

export const Navbar: FC<Props> = ({ isAuthenticated }) => {
    return (
        <>
            <div
                className='flex justify-between py-4 px-6 md:px-40 '
                style={{ boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)' }}
            >
                <a href='/' className='text-2xl font-bold'>
                    <LogoSvg />
                </a>
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
                        <LogOutSvg />
                    </div>
                )}
            </div>
        </>
    );
};
