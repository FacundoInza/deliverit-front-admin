import React, { FC } from 'react';
import { GeneralCard } from '../../../components/ui/generalCard/GeneralCard';
import { SignupForm } from '../../../components/ui/signupForm/ SignupForm';

const InitWorkDay: FC = () => {
    return (
        <div>
            <GeneralCard title='Create your account'>
                <SignupForm />
            </GeneralCard>
        </div>
    );
};

export default InitWorkDay;
