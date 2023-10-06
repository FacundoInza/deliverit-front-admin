'use client';

import Image from 'next/image';
import React, { FC, useState } from 'react';
import MainButton from '../../commons/buttons/MainButton';
import { RequestPasswordReset } from './RequestPasswordReset';
import { VerifyResetToken } from './VerfiyResetToken';
import { ResetPassword } from './ResetPassword';
import { useRouter } from 'next/navigation';
import logo from '../../../assets/deliverit-full.png';

export const ForgotPassword: FC = () => {
    //Step 1: Request password reset
    //Step 2: Verify reset token
    //Step 3: Reset password
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState('');
    const [token, setToken] = useState('');

    const router = useRouter();

    const goToNextStep = () => {
        setStep((prevStep) => prevStep + 1);
    };

    const goToPreviousStep = () => {
        if (step === 1) {
            router.push('/auth');
        }
        setStep((prevStep) => prevStep - 1);
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <RequestPasswordReset
                        onSuccess={setEmail}
                        onNext={goToNextStep}
                    />
                );
            case 2:
                return (
                    <VerifyResetToken
                        email={email}
                        onSuccess={setToken}
                        onNext={goToNextStep}
                    />
                );
            case 3:
                return <ResetPassword email={email} token={token} />;
            default:
                return (
                    <RequestPasswordReset
                        onSuccess={setEmail}
                        onNext={goToNextStep}
                    />
                );
        }
    };

    return (
        <>
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
                {renderStepContent()}
                <div className='sm:mx-auto sm:w-full sm:max-w-sm'>
                    <div className='mt-4'>
                        <MainButton
                            text='Back'
                            btnBlue
                            onClick={goToPreviousStep}
                        />
                    </div>
                </div>
            </div>
        </>
    );
};
